# Monthly Talking Kotlin Website Update

This repo contains the website for the Talking Kotlin Podcast. Since we've last
updated the site, we've likely released new episodes that aren't on the
website yet. Add all episodes released since the last one currently in the
repo (check `_posts/` for the most recent date — `ls _posts | tail -5`).

## Sources of truth (query these directly — do not use derivative sources)

- YouTube playlist: https://www.youtube.com/playlist?list=PLlFc5cFwUnmz1TwkP9SKCHU978dqLTANB
- Spotify show: https://open.spotify.com/show/5ZyWVfBi0WiPlmomrDQ6PM
- Apple Podcasts: https://podcasts.apple.com/us/podcast/talking-kotlin/id1194631266
- Podcast RSS feed (canonical `published` dates, descriptions, episode art).
  As of this writing it is `https://anchor.fm/s/fdcf2fa8/podcast/rss`, but
  don't hardcode that — re-derive it each time in case the podcast host
  changes, via:

  ```bash
  curl -s "https://itunes.apple.com/lookup?id=1194631266&entity=podcast" | python3 -m json.tool
  ```

  Look at the `feedUrl` field in the result.

**Always access these platforms directly** — via `yt-dlp` or the `agent-browser`
CLI skill — instead of Google search results, the live talkingkotlin.com site,
or other secondary aggregators. If YouTube's consent redirect gets in the way
of `yt-dlp`/`WebFetch`, fall back to `agent-browser` (accept the consent
screen, then use DOM snapshots) rather than working around it with indirect
sources. Load the agent-browser skill's core workflow before using it:
`agent-browser skills get core`.

## Convenience toolkit (copy-paste ready, tested against the live feed)

These are drop-in commands for the steps below — reach for these first
instead of reinventing them.

**Date formatting note:** the shell environment used here doesn't allow tools
to call `date`-like "now" functions from within scripts reliably across
runs — but pubDate/upload_date strings from feeds/yt-dlp are static text, so
just parse them directly with the string/regex logic below rather than
routing them through timezone-aware date libraries; no timezone conversion
is needed since all existing post dates are the feed's UTC calendar date.

**1. Find the RSS feed URL:**
```bash
curl -s "https://itunes.apple.com/lookup?id=1194631266&entity=podcast" | jq -r '.results[0].feedUrl'
```

**2. Download the RSS feed once, reuse it for every episode:**
```bash
curl -s "$(curl -s "https://itunes.apple.com/lookup?id=1194631266&entity=podcast" | jq -r '.results[0].feedUrl')" -o /tmp/tk_feed.xml
```

**3. List playlist video IDs (rough pass, to find candidates):**
```bash
yt-dlp --flat-playlist --print "%(id)s" \
  "https://www.youtube.com/playlist?list=PLlFc5cFwUnmz1TwkP9SKCHU978dqLTANB"
```

**4. Get reliable per-video metadata (title/date/duration/description) with `jq`:**
```bash
yt-dlp -j "https://www.youtube.com/watch?v=<video_id>" | \
  jq -r '{title, upload_date, duration, description}'
```

**5. One-shot Python script to pull everything needed from a single RSS `<item>`**
(episode title, published date, rounded length, plain-text description, and
show-notes links) — run this once you've matched the episode by title to
find its index in the feed (index `0` is always the most recent episode):

```bash
python3 - "$INDEX" <<'PYEOF'
import xml.etree.ElementTree as ET
import re, sys

ns = {'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'}
tree = ET.parse('/tmp/tk_feed.xml')
items = tree.getroot().find('channel').findall('item')
it = items[int(sys.argv[1])]

def strip_html(html):
    return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', html)).strip()

def extract_links(html):
    return re.findall(r'href="([^"]+)"', html)

def hms_to_rounded(hms):
    h, m, s = (int(p) for p in hms.split(':'))
    return f"{round((h*3600 + m*60 + s) / 60)} mins"

desc_html = it.findtext('description')
duration = it.findtext('itunes:duration', namespaces=ns)
img = it.find('itunes:image', ns)

print("title:      ", it.findtext('title'))
print("pubDate:    ", it.findtext('pubDate'))          # reformat to YYYY-MM-DD for `published:`
print("length:     ", duration)                         # use directly for `length:`
print("len_rounded:", hms_to_rounded(duration))          # use directly for `length_rounded:`
print("image href: ", img.get('href') if img is not None else None)
print("description:", strip_html(desc_html))
print("links:      ", extract_links(desc_html))
PYEOF
```

Search for an episode's index by title first, e.g.:
```bash
grep -n "<title>" /tmp/tk_feed.xml | grep -i "exposed"
```
(items are in reverse-chronological order, same order as `<title>` matches
top-to-bottom in the raw XML — index `0` is the newest).

**6. Download episode art (only if the `itunes:image href` path contains
`podcast_uploaded_episode`, not `podcast_uploaded_nologo`):**
```bash
curl -s -o images/episodes/<slug>.jpg "<itunes:image href>"
```

**7. YouTube thumbnail fallback, when there's no usable feed art:**
```bash
yt-dlp --skip-download --write-thumbnail --convert-thumbnails jpg \
  -o "images/episodes/<slug>.%(ext)s" \
  "https://www.youtube.com/watch?v=<video_id>"
```

**8. Extract the episode number from a real (non-flat-playlist) YouTube title:**
```bash
python3 -c "import re,sys; m=re.search(r'Talking Kotlin\s*#?(\d+)', sys.argv[1]); print(m.group(1) if m else 'UNNUMBERED')" "$TITLE"
```

**9. Check what's new/changed before wrapping up:**
```bash
git status --short
git diff --stat
```

## Step-by-step process

### 1. Find the starting point

Read the newest 1-2 post(s) in `_posts/` to see the last episode already on
the site, and to confirm the frontmatter schema hasn't changed (compare
against the exact schema given in step 6 below).

### 2. List candidate new episodes from YouTube

```bash
yt-dlp --flat-playlist --print "%(id)s | %(title)s | %(upload_date)s" \
  "https://www.youtube.com/playlist?list=PLlFc5cFwUnmz1TwkP9SKCHU978dqLTANB"
```

This gives you video IDs quickly, but in `--flat-playlist` mode yt-dlp
sometimes mangles the `title` field (it can get truncated/split oddly around
a `|` character, and `upload_date` often comes back as `NA`). Treat this
listing only as a way to find video IDs and the rough order of new episodes.
For each candidate new video, get full, reliable metadata with:

```bash
yt-dlp -j "https://www.youtube.com/watch?v=<video_id>"
```

and read `.title`, `.upload_date` (format `YYYYMMDD`), `.duration` (seconds),
and `.description` out of the returned JSON.

**Episode numbering:** the real video title (from `-j`, not flat-playlist)
usually contains "Talking Kotlin" plus a number, but the exact placement and
formatting vary — all of these have been observed:

- `"How Major Metros Run on Kotlin Multiplatform | Talking Kotlin #145"`
- `"Talking Kotlin #144 | Kotlin 2.3 Release Special (Audio Only)"`
- `"Building AI Agents With Koog | Talking Kotlin 142"` (no `#`)

So match loosely, e.g. a regex like `Talking Kotlin\s*#?(\d+)` against the
full title, checking both prefix and suffix. Some episodes have **no**
number at all (e.g. `"Exposed 1.0 and Beyond | Talking Kotlin"`) — that's a
real, intentional gap in numbering for special/standalone episodes, not a
sign you're missing data. Leave such episodes unnumbered; don't invent a
number for them.

Do **not** trust `<itunes:episode>` from the RSS feed as the episode number
— it has been observed to be duplicated across unrelated episodes (e.g. both
"Exposed 1.0 and Beyond" and "How Major Metros Run on Kotlin Multiplatform"
were tagged `145` in the feed at the same time). The YouTube title number is
the reliable one.

### 3. If the numbering has a gap, verify it independently — don't assume it's a fetch problem

If you find the episode numbers jump (e.g. straight from #142 to #144, no
#143 anywhere), don't keep searching or fill it in — but also don't assume
you just failed to find it. Verify directly on all three platforms with
`agent-browser`:

```bash
agent-browser open "https://www.youtube.com/playlist?list=PLlFc5cFwUnmz1TwkP9SKCHU978dqLTANB"
agent-browser snapshot -i -c
```

then the same `open` + `snapshot -i -c` pattern for the Spotify show URL and
the Apple Podcasts URL. Use `agent-browser click @eN` on element refs from
the snapshot to navigate (e.g. clicking "See All" on Apple Podcasts to get
the full episode list instead of just the most recent few). Note: Spotify's
episode list uses non-standard virtualized scrolling that does not respond
to normal programmatic `scrollTop` manipulation — if you need Spotify's full
episode history and infinite scroll isn't loading more items, prefer Apple
Podcasts' "See All" page instead, which reliably shows the complete
year-grouped episode list.

If all three platforms independently agree the number is skipped, it's a
genuine gap in the source's own numbering — move on, don't fabricate an
episode for it.

### 4. Pull the RSS feed and cross-reference each episode

Download the feed once (toolkit command 2), then find each episode's index
in it by title (toolkit command 5's `grep`), then run the toolkit's one-shot
Python script (toolkit command 5) per episode to get its title, pubDate,
length, length_rounded, image href, plain-text description, and show-notes
links all at once.

Match feed items to YouTube videos by title (titles match closely, sometimes
not word-for-word — e.g. YouTube's "How Major Metros Run on Kotlin
Multiplatform" vs. Apple's "How Major Metros Run on KMP"; match on guest
name/topic if the title doesn't match exactly, and pick the fuller/more
descriptive title as the post title per the rule below).

For each episode, from this feed item you get:
- **`published:`** — use `pubDate` from this feed, reformatted to
  `YYYY-MM-DD`. This is the canonical date and matches what's already in
  existing `_posts/*.md` files exactly. YouTube's `upload_date` and what
  Spotify/Apple display can diverge from this by days or weeks (observed
  example: YouTube `upload_date` `20260223` for an episode whose RSS
  `pubDate` — and the date actually used on the site — was `2026-03-05`).
  Always prefer the RSS `pubDate`.
- **`itunes:duration`** → convert to both `length: "H:MM:SS"` and a rounded
  `length_rounded: "NN mins"`.
- **`description`** → strip HTML tags for the plain-text version. Compare
  it against the YouTube description and Apple/Spotify (visible via
  `agent-browser` if needed) and use whichever is longest/most detailed for
  the post's `description:` field.
- Links inside the HTML `description` (i.e. `<a href="...">...</a>`) are a
  good source for a few `notes:` entries (guest's project, personal site,
  socials) — see step 6 for how many to keep.

### 5. Get episode artwork

Priority order:

1. **The feed's per-episode `itunes:image href`.** Check whether it's real,
   episode-specific art or the show's generic fallback image by looking at
   the URL path: art hosted under a path containing
   `/podcast_uploaded_episode/` is real per-episode art (safe to use);
   art hosted under a path containing `/podcast_uploaded_nologo/` is the
   generic placeholder (the exact same URL will repeat identically across
   multiple unrelated episodes) and should **not** be used. Example of each,
   observed in this feed:
   - Real: `https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_episode/42482138/42482138-<id>.jpg`
   - Generic fallback (skip this): `https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/42482138/7eecf16af75ee8e7.jpg`

   Download real art with:
   ```bash
   curl -s -o images/episodes/<slug>.jpg "<itunes:image href>"
   ```

2. **YouTube thumbnail fallback**, whenever step 1 doesn't yield real art:
   ```bash
   yt-dlp --skip-download --write-thumbnail --convert-thumbnails jpg \
     -o "images/episodes/<slug>.%(ext)s" \
     "https://www.youtube.com/watch?v=<video_id>"
   ```
   This produces a 1280×720 JPEG (vs. the feed's 3000×3000 JPEGs when
   available) — fine as a fallback, just visibly lower-res if compared
   side by side.

Pick `<slug>` to be short and filename-safe. Check `images/episodes/` for
existing filename collisions first (e.g. a guest with the same name as a
prior guest needs a more specific slug, like appending the episode topic).

### 6. Fill in any missing details

- If a guest's name is incomplete (e.g. only a first name given anywhere),
  cross-check social links found in the RSS `description` HTML (e.g. a
  Twitter/X profile link like `x.com/<handle>`) or do a targeted web search
  to confirm the full name — don't guess or leave it partial.
- Write a short 1-2 sentence `bio:` synthesized from context (RSS
  description + any bio blurb on the platforms) — there is no dedicated
  "guest bio" field in the feed to copy from directly.

### 7. Create one `_posts/YYYY-MM-DD-slug.md` file per episode

Match this frontmatter schema exactly (also check any existing post in
`_posts/` for a live example, in case the schema has evolved since this was
written):

```yaml
---
layout: post
title: "<episode title>"
guest: <Guest Name>              # or "Sebastian Aigner and Márton Braun" for host-only/audio-exclusive episodes
recorded: YYYY-MM-DD             # see note below
published: YYYY-MM-DD            # from the RSS feed's pubDate, NOT YouTube's upload_date
trackid:                          # ALWAYS leave blank — SoundCloud is no longer used
youtubeid: <YouTube video id>
length: "H:MM:SS"
length_rounded: "NN mins"
tags: [Tag1, Tag2, Tag3]
image: <filename>.jpg
description: "<longest/best description across platforms, 2-4 sentences>"
bio: "<short guest bio, 1-2 sentences>"
notes:
    - text: <label>
      link: <url>
    - text: <label>
      link: <url>
---
```

- `trackid:` is left blank on every new post (no SoundCloud publishing
  anymore). The post layout (`_layouts/post.html`) still renders a SoundCloud
  iframe unconditionally even with a blank `trackid` — that's a pre-existing
  quirk of the template, not something to fix as part of this task.
- `recorded:` — there is no reliable source for the actual recording date
  anywhere (YouTube/Spotify/Apple/RSS all only carry the publish date). Set
  it equal to `published:` as a placeholder, and **explicitly flag this** in
  your final summary so the host can correct it if they remember the actual
  recording date.
- `notes:` should be a **short curated list of 3-6 entries** (the main
  project/topic link, guest's personal site, guest's social profiles) — not
  a dump of every link found in the RSS description, which tends to include
  a much longer, more exhaustive set of links than this site's established
  convention.
- Title: if YouTube/Spotify/Apple show meaningfully different titles for the
  same episode, use the fuller/more descriptive one (e.g. prefer "Creator of
  Spring: No Desire to Write Java at All" over YouTube's truncated "No
  desire to write Java").
- No manual index/listing files need updating — `index.html` and
  `tags/index.html` auto-discover posts and tags via Jekyll's
  `paginator.posts` / `site.tags`, so a new post automatically appears
  everywhere it needs to.

### 8. Verify before finishing

```bash
bundle install   # only if gems aren't already installed
bundle exec jekyll serve --port 4000
```

Then either check the rendered HTML directly, or use `agent-browser open
http://localhost:4000` + `agent-browser snapshot -i -c` to confirm:
- The new posts appear on the home page listing, most recent first.
- Each new post's YouTube embed, description, bio, and show notes render.
- Any new tags show up correctly (tag pages are auto-generated).

Finally, confirm the diff is minimal and expected:
```bash
git status --short
```
This should show exactly one new `.md` file per episode plus one new image
per episode, and nothing else touched.

### 9. Report back — do not commit or push

Do not commit or push unless explicitly asked to. Just leave the new files
staged/unstaged in the working tree and report:
- The list of new episodes added, with dates and episode numbers.
- Any gap(s) found in episode numbering and how you verified them (which
  platforms you checked directly).
- A reminder that `recorded:` dates are best-guess placeholders (set equal
  to `published:`) and may need manual correction.

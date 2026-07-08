---
layout: page
title: About
description: "Talking Kotlin is hosted by Sebastian Aigner and Márton Braun."
comments: false
---

<p class="lede">{{ site.owner.bio }}</p>

<div class="host-grid">
  <div class="host-card">
    <div class="host-card__avatar">
      <img src="https://github.com/SebastianAigner.png" alt="Sebastian Aigner" width="72" height="72" loading="lazy">
    </div>
    <h3 class="host-card__name">Sebastian Aigner</h3>
    <p class="host-card__role">Host</p>
    <a class="host-card__link" href="{{ site.owner.sebi }}" target="_blank" rel="noopener">sebi.io &rarr;</a>
  </div>
  <div class="host-card">
    <div class="host-card__avatar">
      <img src="https://github.com/zsmb13.png" alt="Márton Braun" width="72" height="72" loading="lazy">
    </div>
    <h3 class="host-card__name">Márton Braun</h3>
    <p class="host-card__role">Host</p>
    <a class="host-card__link" href="{{ site.owner.zsmb }}" target="_blank" rel="noopener">zsmb.co &rarr;</a>
  </div>
</div>

## Listen &amp; Follow

<ul class="tag-pill-list">
  <li><a class="tag-pill" href="https://podcasts.apple.com/us/podcast/talking-kotlin/id1194631266" target="_blank" rel="noopener">Apple Podcasts</a></li>
  <li><a class="tag-pill" href="https://open.spotify.com/show/5ZyWVfBi0WiPlmomrDQ6PM" target="_blank" rel="noopener">Spotify</a></li>
  <li><a class="tag-pill" href="https://anchor.fm/s/fdcf2fa8/podcast/rss" target="_blank" rel="noopener">RSS Feed</a></li>
  {% if site.owner.twitter %}<li><a class="tag-pill" href="https://twitter.com/{{ site.owner.twitter }}" target="_blank" rel="noopener">Twitter</a></li>{% endif %}
  {% if site.owner.youtube %}<li><a class="tag-pill" href="{{ site.owner.youtube }}" target="_blank" rel="noopener">YouTube</a></li>{% endif %}
</ul>

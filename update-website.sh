#!/bin/sh
# Launches the selected agent harness, seeded with the website update prompt.
cd "$(dirname "$0")" || exit 1

YELLOW='\033[1;33m'
GREEN='\033[1;32m'
RESET='\033[0m'

printf "%bHow would you like to update the website?%b\n" "$GREEN" "$RESET"
printf "  1) Claude Code (Sonnet)\n"
printf "  2) Junie\n"
printf "  3) Just copy the prompt into my clipboard (macOS only)\n"
printf "Select an option [1-3]: "
read -r choice

case "$choice" in
    1)
        claude --model sonnet --permission-mode auto "$(cat UPDATE-WEBSITE-PROMPT.md)"
        ;;
    2)
        junie --prompt "$(cat UPDATE-WEBSITE-PROMPT.md)"
        ;;
    3)
        if [ "$(uname -s)" != "Darwin" ]; then
            printf "%bClipboard copying is only supported on macOS.%b\n" "$YELLOW" "$RESET" >&2
            exit 1
        fi
        if ! command -v pbcopy >/dev/null 2>&1; then
            printf "%bCould not find pbcopy.%b\n" "$YELLOW" "$RESET" >&2
            exit 1
        fi
        pbcopy < UPDATE-WEBSITE-PROMPT.md
        printf "%bPrompt copied to your clipboard.%b\n" "$GREEN" "$RESET"
        ;;
    *)
        printf "%bInvalid option. Please select 1, 2, or 3.%b\n" "$YELLOW" "$RESET" >&2
        exit 1
        ;;
esac

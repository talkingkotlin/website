#!/bin/sh
# Launches an interactive Claude Code session, driven by Sonnet (the
# cheapest model that supports auto permission mode), seeded with the
# website update prompt.
cd "$(dirname "$0")" || exit 1

YELLOW='\033[1;33m'
GREEN='\033[1;32m'
RESET='\033[0m'

printf "%bRunning this update using Claude Code is more expensive than it has to be;%b I'd recommend instead copying the prompt from the repo into an agent with a small and cheap model (e.g. OpenCode with any of the Flash Models, or Junie with Qwen).\n%bIf that's not an option, press enter to proceed, and we'll do it in Claude!%b\n" "$YELLOW" "$RESET" "$GREEN" "$RESET"
read -r _

claude --model sonnet --permission-mode auto "$(cat UPDATE-WEBSITE-PROMPT.md)"

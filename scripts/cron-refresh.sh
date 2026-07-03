#!/bin/bash
# Wrapper invoked by the launchd/cron schedule every 48h. Refreshes all four
# data/*.json snapshots. Uses an absolute node path because launchd/cron run
# with a minimal PATH. Logs to data/.refresh.log.
set -euo pipefail

PROJECT_DIR="/Users/macbookpro/Desktop/portfolio"
NODE="$HOME/.local/share/fnm/aliases/default/bin/node"
# Fallbacks if the fnm default alias isn't present.
[ -x "$NODE" ] || NODE="$(command -v node || echo /usr/local/bin/node)"

cd "$PROJECT_DIR" || exit 1
echo "===== $(date) ====="
"$NODE" scripts/refresh-all.mjs

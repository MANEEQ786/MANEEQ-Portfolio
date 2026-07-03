#!/bin/bash
# Hostinger cron entry — triggers the platform refresh on the running site.
#
# Set this up in hPanel → Advanced → Cron Jobs. You can either paste the curl
# command directly, or point the cron at this script.
#
# Schedule for 2:00 PM Pakistan time (PKT) on Mon / Wed / Fri:
#   • If the server timezone is UTC:           0 9  * * 1,3,5
#   • If the server timezone is Asia/Karachi:  0 14 * * 1,3,5
# (Check your server's timezone in hPanel; PKT is UTC+5.)
#
# Env:
#   SITE_URL     full https URL of the deployed site (e.g. https://saqibmasood.com)
#   CRON_SECRET  same secret configured in the app's environment
#
# Example hPanel command (no script file needed):
#   curl -s -m 600 -H "Authorization: Bearer YOUR_CRON_SECRET" \
#        https://yourdomain.com/api/cron/refresh-platforms >/dev/null 2>&1

set -u

SITE_URL="${SITE_URL:-https://yourdomain.com}"
SECRET="${CRON_SECRET:-}"

if [ -z "$SECRET" ]; then
  echo "CRON_SECRET is not set" >&2
  exit 1
fi

curl -s -m 600 \
  -H "Authorization: Bearer ${SECRET}" \
  "${SITE_URL%/}/api/cron/refresh-platforms" \
  -w "\nHTTP %{http_code} in %{time_total}s\n"

#!/usr/bin/env sh

# abort on errors
set -e

# pnpm clean
NITRO_PRESET=cloudflare-pages pnpm build
npx wrangler pages publish dist/

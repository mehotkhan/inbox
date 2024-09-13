#!/usr/bin/env sh

# abort on errors
set -e

rm -rf ./migrations
npx drizzle-kit generate
# npx drizzle-kit push
wrangler d1 migrations apply inbox --local

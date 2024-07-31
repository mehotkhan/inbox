#!/usr/bin/env sh

# abort on errors
set -e

rm main.db
rm -rf ./migrations
npx drizzle-kit generate
npx drizzle-kit migrate
npx drizzle-kit push
# ❯ npx wrangler d1 execute inbox  --file=migrations/0000_hot_hydra.sql

#!/usr/bin/env sh

# abort on errors
set -e

rm main.db
rm -rf server/db/migrations
npx drizzle-kit generate
npx drizzle-kit push

#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m "New"
git push -u origin main

cs -
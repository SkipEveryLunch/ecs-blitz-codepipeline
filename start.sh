#!/bin/sh
# Prisma のマイグレーションを実行
npx blitz prisma migrate deploy

# アプリケーションを起動
npm run start

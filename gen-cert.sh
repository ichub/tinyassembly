#!/usr/bin/env bash

if [ ! -d "./letsencrypt" ]; then
  git clone https://github.com/letsencrypt/letsencrypt
fi

cd letsencrypt

sudo ./letsencrypt-auto certonly --manual --dry-run


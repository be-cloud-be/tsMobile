#!/bin/bash
DOKKU_HOST="dokku.socomaconstruction.com";
APP_NAME="ts-mobile";

# Create app
ssh dokku@$DOKKU_HOST apps:create $APP_NAME

# Mount volumes
ssh dokku@$DOKKU_HOST storage:mount $APP_NAME /var/lib/dokku/data/storage/extra-addons:/mnt/extra-addons

# Set proxy settings
ssh dokku@$DOKKU_HOST proxy:ports-add $APP_NAME http:80:8100

git remote add dokku dokku@$DOKKU_HOST:$APP_NAME
git push dokku master
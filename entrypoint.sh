#!/bin/bash

# set -e

cd /app

exec ionic serve --lab "$@"

exit 1
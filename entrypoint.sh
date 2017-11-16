#!/bin/bash

# set -e

cd /usr/src/app

exec ionic serve --lab "$@"

exit 1
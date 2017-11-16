#!/bin/bash

# set -e

cd $WORKDIR

exec ionic serve --lab "$@"

exit 1
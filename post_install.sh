#!/usr/bin/env bash

cd "$(cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd)"

./node_modules/grunt/bin/grunt build

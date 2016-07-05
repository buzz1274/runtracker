#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

/usr/local/venv/runtracker.zz50.co.uk/bin/python2.7 "$DIR"/manage.py "$@"
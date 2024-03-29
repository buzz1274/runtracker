#!/usr/bin/env python
from fabric.api import settings, hide, run, local
from fabric.operations import get
from fabric.colors import red
import datetime
import sys
import tarfile
import os

personal_bests =\
    ["INSERT INTO personal_bests (user_id, type, activity_ids, min_distance, max_distance, display_order, title, min_speed, max_seconds) VALUES (1, 'longest', (SELECT id FROM activity_type WHERE activity_type = 'Running'), Null, Null, 1, 'Longest run', Null, Null);",
     "INSERT INTO personal_bests (user_id, type, activity_ids, min_distance, max_distance, display_order, title, min_speed, max_seconds) VALUES (1, 'longest', (SELECT id FROM activity_type WHERE activity_type = 'Running'), 5000, Null, 2, 'Longest >13K', 13, Null);"
     "INSERT INTO personal_bests (user_id, type, activity_ids, min_distance, max_distance, display_order, title, min_speed, max_seconds) VALUES (1, 'fastest', (SELECT id FROM activity_type WHERE activity_type = 'Running'), 5000, 5100, 3, 'Fastest 5K', Null, Null);",
     "INSERT INTO personal_bests (user_id, type, activity_ids, min_distance, max_distance, display_order, title, min_speed, max_seconds) VALUES (1, 'fastest', (SELECT id FROM activity_type WHERE activity_type = 'Running'), 10000, 10100, 4, 'Fastest 10K', Null, Null);",
     "INSERT INTO personal_bests (user_id, type, activity_ids, min_distance, max_distance, display_order, title, min_speed, max_seconds) VALUES (1, 'fastest', (SELECT id FROM activity_type WHERE activity_type = 'Running'), 16100, 16200, 5, 'Fastest 16.1K', Null, Null);",
     "INSERT INTO personal_bests (user_id, type, activity_ids, min_distance, max_distance, display_order, title, min_speed, max_seconds) VALUES (1, 'longest', (SELECT id FROM activity_type WHERE activity_type = 'Running'), Null, Null, 6, 'Longest <=1hr', Null, 3600);",
     "INSERT INTO personal_bests (user_id, type, activity_ids, min_distance, max_distance, display_order, title, min_speed, max_seconds) VALUES (1, 'longest', (SELECT id FROM activity_type WHERE activity_type = 'Hiking'), Null, Null, 7, 'Longest hike', Null, Null);",
     "INSERT INTO personal_bests (user_id, type, activity_ids, min_distance, max_distance, display_order, title, min_speed, max_seconds) VALUES (1, 'longest', (SELECT id FROM activity_type WHERE activity_type = 'Casual walking'), Null, Null, 8, 'Longest walk', Null, Null);"]

with open('runtracker_setup.sql', 'w') as setup_file:
    for line in personal_bests:
        print>>setup_file, line

    if not os.path.exists('runtracker_setup.sql'):
        print red("Failed to create setup file(runtracker_setup.sql)")
        sys.exit()

with settings(warn_only=True, host_string='icarus.zz50.co.uk', user='dave'):
    run('sudo /var/docker/docker/containers/websites/runtracker.zz50.co.uk/scripts/backup.sh')
    filename = 'runtracker.zz50.co.uk_%d-%02d-%02d.tar.gz' % (datetime.datetime.now().year,
                                                              datetime.datetime.now().month,
                                                              datetime.datetime.now().day,)

    status = get('~/docker_backups/runtracker.zz50.co.uk/%s' % (filename,),
                 './runtracker.tar.gz')

    if status.failed:
        print red("Failed to download backup(%s)" % (filename,))
        sys.exit()

with tarfile.open('runtracker.tar.gz') as tar:
    tar.extractall()

    if not os.path.exists('runtracker.zz50.co.uk.sql'):
        local('rm runtracker.tar.gz')
        print red("Failed to extract backup archive(%s)" % (filename,))
        sys.exit()

local('sudo docker cp runtracker.zz50.co.uk.sql postgres:/tmp/runtracker.zz50.co.uk.sql')
local('sudo docker cp runtracker_setup.sql postgres:/tmp/runtracker_setup.sql')
local('heroku run php artisan migrate:refresh')
local('export `heroku config -s` && '
      'sudo docker exec -it postgres bash -c '
      '"export PGPASSWORD=$DB_PASSWORD; psql -U$DB_USERNAME -h$DB_HOST $DB_DATABASE '
      '< /tmp/runtracker.zz50.co.uk.sql"')
local('heroku run php artisan db:convert')
local('export `heroku config -s` && '
      'sudo docker exec -it postgres bash -c '
      '"export PGPASSWORD=$DB_PASSWORD; psql -U$DB_USERNAME -h$DB_HOST $DB_DATABASE '
      '< /tmp/runtracker_setup.sql"')
#local('sudo docker exec -it postgres bash -c "rm -f /tmp/*.sql"')
local('rm runtracker.zz50.co.uk.sql')
local('rm runtracker_setup.sql')
local('rm runtracker.tar.gz')

#!/usr/bin/env bash

if [ ! -f "runtracker.sql" ]; then
    echo "runtracker.sql does not exist"
fi

export `heroku config -s`

heroku run php artisan migrate:refresh
sudo docker cp runtracker.sql postgres:/tmp/runtracker.sql
sudo docker cp runtracker.sql postgres:/tmp/runtracker_setup.sql
sudo docker exec -it postgres bash -c "export PGPASSWORD=$DB_PASSWORD; psql -U$DB_USERNAME -h$DB_HOST $DB_DATABASE < /tmp/runtracker.sql"
heroku run php artisan db:convert
sudo docker exec -it postgres bash -c "export PGPASSWORD=$DB_PASSWORD; psql -U$DB_USERNAME -h$DB_HOST $DB_DATABASE < /tmp/runtracker_setup.sql"
# Version 0.0.1
FROM web
MAINTAINER David Exelby "david@sulaco.co.uk"

#PHP7
RUN composer global require "laravel/installer" && \
    ln -s /root/.composer/vendor/bin/laravel /usr/local/bin/laravel

RUN npm install -g webpack
RUN npm install -g grunt-cli
RUN npm install -g webpack-dev-server
RUN npm install -g knockout

#configure httpd
RUN sed -i 's|^DocumentRoot.*|DocumentRoot "/var/www/html"|' /etc/httpd/conf/httpd.conf && \
    sed -i 's|^#ServerName.*|ServerName runtracker.zz50.co.uk|' /etc/httpd/conf/httpd.conf && \
    sed -i 's|^ServerAdmin.*|ServerAdmin webmaster@zz50.co.uk|' /etc/httpd/conf/httpd.conf
COPY runtracker.zz50.co.uk.conf /etc/httpd/conf.d/runtracker.zz50.co.uk.conf

ADD run-apache.sh /run-apache.sh
RUN chmod -v +x /run-apache.sh

ARG DEVELOPMENT=false

WORKDIR /
CMD ["/run-apache.sh"]
EXPOSE 80
EXPOSE 443


















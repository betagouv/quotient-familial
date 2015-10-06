FROM        node:0.12.7-wheezy

MAINTAINER  Thibaut Géry

RUN mkdir -p /var/www/app

COPY app /var/www/app

COPY package.json /var/www/package.json

WORKDIR /var/www

RUN npm install

VOLUME /var/www/app

CMD /usr/bin/tail -f /dev/null

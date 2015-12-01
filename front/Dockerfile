FROM        node:4.2-wheezy

MAINTAINER  Thibaut Géry

RUN mkdir -p /var/www/qf && mkdir -p /root/front

WORKDIR /root/front

COPY package.json /root/front

RUN npm install --production

COPY ./ /root/front

RUN npm install --production && npm run build

RUN cp -r /root/front/dist/* /var/www/qf/

VOLUME /var/www/qf

CMD sh

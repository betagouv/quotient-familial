FROM        nginx

MAINTAINER  Thibaut Géry

RUN rm /etc/nginx/conf.d/default.conf

ADD nginx.conf /etc/nginx/nginx.conf

ADD default-vhost /etc/nginx/sites-available/rentree-simplifiee.conf

RUN ln -s /etc/nginx/sites-available/rentree-simplifiee.conf /etc/nginx/conf.d/rentree-simplifiee.conf

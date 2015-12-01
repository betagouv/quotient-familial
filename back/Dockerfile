FROM        ubuntu:14.04

MAINTAINER  Thibaut Géry

ENV         ACTIVATOR_VERSION 1.3.6

# INSTALL OS DEPENDENCIES
RUN         apt-get update; apt-get install -y software-properties-common unzip

# INSTALL JAVA 8
RUN         echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections && \
            echo debconf shared/accepted-oracle-license-v1-1 seen true | debconf-set-selections && \
            add-apt-repository -y ppa:webupd8team/java && \
            apt-get update && \
            apt-get install -y oracle-java8-installer

# INSTALL TYPESAFE ACTIVATOR
RUN         cd /tmp && \
            wget http://downloads.typesafe.com/typesafe-activator/$ACTIVATOR_VERSION/typesafe-activator-$ACTIVATOR_VERSION.zip && \
            unzip typesafe-activator-$ACTIVATOR_VERSION.zip -d /usr/local && \
            mv /usr/local/activator-dist-$ACTIVATOR_VERSION /usr/local/activator && \
            rm typesafe-activator-$ACTIVATOR_VERSION.zip

#ADD DEPENDENCIES
ADD         build.sbt /root/
ADD         project/plugins.sbt /root/project/
WORKDIR     /root
RUN         /usr/local/activator/activator build


# COMMIT PROJECT FILES
ADD         app /root/app
ADD         test /root/test
ADD         conf /root/conf
ADD         public /root/public
ADD         build.sbt /root/
ADD         project/plugins.sbt /root/project/
ADD         project/build.properties /root/project/

# BUILD THE PROJECT
WORKDIR     /root
RUN         /usr/local/activator/activator stage


# CONFIGURE IMAGE
WORKDIR     /root
ENTRYPOINT  ["target/universal/stage/bin/play-scala"]
EXPOSE      9000

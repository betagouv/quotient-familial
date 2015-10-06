play-sample-app
===============

This app contains :

 * some web services powered by play (in scala)
 * Mongo to store the data
 * Angularjs for the frontend
 * Nginx to serve the static content as well as the API


RUN
---

### Requirements

All you need is docker :
 * [Docker](https://docs.docker.com/installation/)
 * [Docker Compose](https://docs.docker.com/compose/install/)

### Usage

The different commands are :

 * Run the everything `docker-compose up`
 * Build `docker-compose build`
 * Remove `docker-compose rm -f`


Test
----

### TODO

 * Run the test in docker
 * Use a makefile to simplify

### Requirements

All you need is docker :
 * [Java](https://www.java.com/fr/download/)
 * [Scala](http://www.scala-lang.org/download/install.html)
 * [Sbt](http://www.scala-sbt.org/release/tutorial/Setup.html)
 * [Node](https://nodejs.org/en/)

### Usage

The different commands are :

 * Run front test `cd front && npm test`
 * Run back test `cd back && sbt test`



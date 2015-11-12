name := """play-scala"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.6"

ivyScala := ivyScala.value map {
  _.copy(overrideScalaVersion = true)
}

libraryDependencies ++= Seq(
  cache,
  ws,
  specs2 % Test,
  "org.reactivemongo" %% "play2-reactivemongo" % "0.11.7.play24",
  "de.leanovate.play-mockws" %% "play-mockws" % "2.4.1" % "test"

)

resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"

// Play provides two styles of routers, one expects its actions to be injected, the
// other, legacy style, accesses its actions statically.
routesGenerator := InjectedRoutesGenerator

package services

import models.User
import models.JsonFormats._
import reactivemongo.api.ReadPreference


import scala.concurrent.{ ExecutionContext, Future }

import play.api.libs.json.Json


import play.modules.reactivemongo.ReactiveMongoApi
import play.modules.reactivemongo.json.collection.JSONCollection

import reactivemongo.bson.BSONDocument
import reactivemongo.api.commands.WriteResult

import play.api.libs.json._
import play.modules.reactivemongo.json.collection._

class UserDao(reactiveMongoApi: ReactiveMongoApi)  {
  // BSON-JSON conversions
  import play.modules.reactivemongo.json._
  protected def collection =
    reactiveMongoApi.db.collection[JSONCollection]("persons")

  def find()(implicit ec: ExecutionContext): Future[List[User]] =
    collection
      .find(Json.obj())
      .sort(Json.obj("created" -> -1))
      .cursor[User](ReadPreference.primary)
      .collect[List]()

  def insert(user: User)(implicit ec: ExecutionContext) : Future[WriteResult] = {
    collection.insert(user)
  }

  def findByLastName(lastName: String)(implicit ec: ExecutionContext) =
    collection
      .find(Json.obj("lastName" -> lastName))
      .sort(Json.obj("created" -> -1))
      .cursor[User](ReadPreference.primary)
      .collect[List]()

}
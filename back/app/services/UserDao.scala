package services

import javax.inject.Inject

import models.JsonFormats._
import models.User
import play.api.libs.json.Json
import play.modules.reactivemongo.ReactiveMongoApi
import play.modules.reactivemongo.json.collection.{JSONCollection, _}
import reactivemongo.api.ReadPreference
import reactivemongo.api.commands.WriteResult

import scala.concurrent.{ExecutionContext, Future}

class UserDao @Inject()(reactiveMongoApi: ReactiveMongoApi) {
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

  def insert(user: User)(implicit ec: ExecutionContext): Future[WriteResult] = {
    collection.insert(user)
  }

  def findByLastName(lastName: String)(implicit ec: ExecutionContext) =
    collection
      .find(Json.obj("lastName" -> lastName))
      .sort(Json.obj("created" -> -1))
      .cursor[User](ReadPreference.primary)
      .collect[List]()

}
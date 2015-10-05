package controllers

import javax.inject.Inject

import play.api.Logger
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json._
import play.api.mvc.{Action, Controller}
import reactivemongo.core.actors.Exceptions.PrimaryUnavailableException
import services.UserDao

import scala.concurrent.Future


// BSON-JSON conversions/collection


/*
 * Example using ReactiveMongo + Play JSON library.
 *
 * There are two approaches demonstrated in this controller:
 * - using JsObjects directly
 * - using case classes that can be turned into JSON using Reads and Writes.
 *
 * This controller uses case classes and their associated Reads/Writes
 * to read or write JSON structures.
 *
 * Instead of using the default Collection implementation (which interacts with
 * BSON structures + BSONReader/BSONWriter), we use a specialized
 * implementation that works with JsObject + Reads/Writes.
 *
 * Of course, you can still use the default Collection implementation
 * (BSONCollection.) See ReactiveMongo examples to learn how to use it.
 */
class Users @Inject()(
                       val postRepo: UserDao) extends Controller {

  /*
   * Get a JSONCollection (a Collection implementation that is designed to work
   * with JsObject, Reads and Writes.)
   * Note that the `collection` is not a `val`, but a `def`. We do _not_ store
   * the collection reference to avoid potential problems in development with
   * Play hot-reloading.
   */
  // ------------------------------------------ //
  // Using case classes + JSON Writes and Reads //
  // ------------------------------------------ //

  import models.JsonFormats._
  import models._

  def create = Action.async {
    val user = User(29, "John", "Smith", List(
      Feed("Slashdot news", "http://slashdot.org/slashdot.rdf")))
    // insert the user
    val futureResult = postRepo.insert(user)
    // when the insert is performed, send a OK 200 result
    futureResult.map(_ => Created)
  }

  def createFromJson = Action.async(parse.json) { request =>
    /*
     * request.body is a JsValue.
     * There is an implicit Writes that turns this JsValue as a JsObject,
     * so you can call insert() with this JsValue.
     * (insert() takes a JsObject as parameter, or anything that can be
     * turned into a JsObject using a Writes.)
     */
    request.body.validate[User].map { user =>
      // `user` is an instance of the case class `models.User`
      postRepo.insert(user).map { lastError =>
        Logger.debug(s"Successfully inserted with LastError: $lastError")
        if (lastError.hasErrors) InternalServerError
        Created(Json.toJson(user))
      }
    }.getOrElse(Future.successful(BadRequest("invalid json")))
  }

  def findByName(lastName: String) = Action.async {
    postRepo.findByLastName(lastName)
      .map(users => Ok(Json.toJson(users)))
      .recover {
      case PrimaryUnavailableException => InternalServerError("Please install MongoDB")
      case _ => InternalServerError("An error has occured")
    }
  }

  def getAll = Action.async {
    postRepo.find()
      .map(users => Ok(Json.toJson(users)))
      .recover {
      case PrimaryUnavailableException => InternalServerError("Please install MongoDB")
      case _ => InternalServerError("An error has occured")
    }

  }


}
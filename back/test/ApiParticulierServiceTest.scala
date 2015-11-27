import models.JsonDeclarationFormats._
import models.{Declarant, Declaration}
import org.junit.runner.RunWith
import org.specs2.mutable.Specification
import org.specs2.runner.JUnitRunner
import play.api.libs.json._
import play.api.mvc._
import play.api.routing.sird._
import play.api.test._
import play.core.server.Server
import services.ApiParticulierService

import scala.concurrent.Await
import scala.concurrent.duration._

@RunWith(classOf[JUnitRunner])
class ApiParticulierServiceTest extends Specification {

  val declaration = Declaration(
    Declarant(
      "Gery",
      "Gery",
      "Thibaut",
      "23/11/1990"
    ),
    Declarant(
      "Gery",
      "Gery",
      "Catherine",
      "23/11/1992"
    ),
    "23/04/2013",
    "23/04/2013",
    2,
    "Marié",
    2,
    50000,
    50000,
    Some(50000),
    Some(6000),
    6000,
    "2015",
    "2014"
  )
  val adress = JsObject(Seq(
    "name" -> JsString("Watership Down"),
    "location" -> JsObject(Seq("lat" -> JsNumber(51.235685), "long" -> JsNumber(-1.309197))),
    "residents" -> JsArray(Seq(
      JsObject(Seq(
        "name" -> JsString("Fiver"),
        "age" -> JsNumber(4),
        "role" -> JsNull
      )),
      JsObject(Seq(
        "name" -> JsString("Bigwig"),
        "age" -> JsNumber(6),
        "role" -> JsString("Owsla")
      ))
    ))
  ))

  val apiParticulierMock: PartialFunction[RequestHeader, Handler] = {
    case GET(p"/api/impots/svair" ? q"numeroFiscal=${numeroFiscal}" ? q"referenceAvis=${referenceAvis}") => Action {
      (numeroFiscal, referenceAvis) match {
        case ("1", "2") => Results.Ok(Json.toJson(declaration))
        case ("1", "3") => Results.NotFound("Not Found")
      }
    }
    case GET(p"/api/impots/adress" ? q"numeroFiscal=${numeroFiscal}" ? q"referenceAvis=${referenceAvis}") => Action {
      (numeroFiscal, referenceAvis) match {
        case ("1", "2") => Results.Ok(adress)
        case ("1", "3") => Results.NotFound("Not Found")
      }
    }
  }

  "ApiParticulier Api" should {
    "svair declaration" should {
      "get a declaration" in {
        Server.withRouter()(apiParticulierMock) { implicit port =>
          WsTestClient.withClient { client =>
            val result = Await.result(
              new ApiParticulierService(client, "", "toto").declaration("1", "2"), 10.seconds)
            result must_== Some(declaration)
          }
        }
      }

      "return None if it hasn't been found" in {
        Server.withRouter()(apiParticulierMock) { implicit port =>
          WsTestClient.withClient { client =>
            val result = Await.result(
              new ApiParticulierService(client, "", "toto").declaration("1", "3"), 10.seconds)
            result must_== None
          }
        }
      }
    }

    "svair declaration" should {
      "get adress" in {
        Server.withRouter()(apiParticulierMock) { implicit port =>
          WsTestClient.withClient { client =>
            val result = Await.result(
              new ApiParticulierService(client, "", "toto").adress("1", "2"), 10.seconds)
            result must_== Some(adress)
          }
        }
      }

      "return None if it hasn't been found" in {
        Server.withRouter()(apiParticulierMock) { implicit port =>
          WsTestClient.withClient { client =>
            val result = Await.result(
              new ApiParticulierService(client, "", "toto").adress("1", "3"), 10.seconds)
            result must_== None
          }
        }
      }
    }

  }
}
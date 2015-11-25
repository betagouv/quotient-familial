import models.{Declarant, Declaration}
import models.JsonDeclarationFormats._
import org.junit.runner.RunWith
import org.specs2.runner.JUnitRunner
import play.core.server.Server
import play.api.routing.sird._
import play.api.mvc._
import play.api.libs.json._
import play.api.test._
import services.SvairService

import scala.concurrent.Await
import scala.concurrent.duration._

import org.specs2.mutable.Specification

@RunWith(classOf[JUnitRunner])
class SvairServiceTest extends Specification {

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

  "Svair Api" should {
    "get a declaration" in {
      Server.withRouter() {
        case GET(p"/api/impots/svair" ? q"numeroFiscal=${numeroFiscal}" ? q"referenceAvis=${referenceAvis}") => Action {
          (numeroFiscal, referenceAvis) match {
            case ("1","2") => Results.Ok(Json.toJson(declaration))
            case ("1","3") => Results.NotFound("Not Found")
          }

        }
      } { implicit port =>
        WsTestClient.withClient { client =>
          val result = Await.result(
            new SvairService(client, "","toto").declaration("1","2"), 10.seconds)
          result must_== Some(declaration)
        }
      }
    }

    "return None if it hasn't been found" in {
      Server.withRouter() {
        case GET(p"/api/impots/svair" ? q"numeroFiscal=${numeroFiscal}" ? q"referenceAvis=${referenceAvis}") => Action {
          (numeroFiscal, referenceAvis) match {
            case ("1","2") => Results.Ok(Json.toJson(declaration))
            case ("1","3") => Results.NotFound(Json.obj("error" -> "Not Found"))
          }

        }
      } { implicit port =>
        WsTestClient.withClient { client =>
          val result = Await.result(
            new SvairService(client, "","toto").declaration("1","3"), 10.seconds)
          result must_== None
        }
      }
    }
  }
}
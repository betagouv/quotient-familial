import models.JsonDeclarationFormats._
import models.{Declarant, Declaration}
import org.junit.runner.RunWith
import org.specs2.mutable.Specification
import org.specs2.runner.JUnitRunner
import play.api.Configuration
import play.api.inject.guice.GuiceApplicationBuilder
import play.api.libs.json._
import play.api.libs.ws.{WSResponse, WS}
import play.api.mvc._
import play.api.test
import play.api.routing.sird._
import play.api.test._
import play.api.mvc._
import play.api.libs.json._
import play.core.server.Server
import play.api.http.Status

@RunWith(classOf[JUnitRunner])
class QuotientFamilialSpecs extends PlaySpecification {

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

  "The quotient familial API" should {

    "return the quotient when asked" in {
      Server.withRouter() {
        case _ => Action {
          Results.Ok(Json.toJson(declaration))
        }
      } { implicit portMock =>
        val apiPartUrl = "http://localhost:" + portMock
        val app = new GuiceApplicationBuilder()
          .configure("apiparticulier.host" -> apiPartUrl)
        .build()
        new WithServer(app) {
          val response: WSResponse = await(WS.url("http://localhost:" + port + "/api/quotient-familial?numeroFiscal=3&referenceAvis=4").get())
          response.status must equalTo(Status.OK)
          response.body must contain("Catherine")
        }
      }
    }
  }
}

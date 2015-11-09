import javax.inject.Inject
import scala.util.Properties

import models._
import models.JsonFormats._
import org.junit.runner._
import org.specs2.runner._
import play.api.Configuration
import play.api.inject.guice.GuiceApplicationBuilder
import play.api.libs.json.Json
import play.api.libs.ws.WS
import play.api.test._
import play.modules.reactivemongo.{DefaultReactiveMongoApi, ReactiveMongoApi}
import play.modules.reactivemongo.json.collection.JSONCollection
import play.api.libs.concurrent.Execution.Implicits._

/**
 * Add your spec here.
 * You can mock out a whole application including requests, plugins etc.
 * For more information, consult the wiki.
 */
@RunWith(classOf[JUnitRunner])
class QuotientFamilialeSpec extends PlaySpecification {

  val mongoConnection = Properties.envOrElse("MONGO_CONNECTION_STRING", "mongodb://localhost:27017/sample-test" )

  val app = new GuiceApplicationBuilder()
    .configure(Configuration("mongodb.uri" -> mongoConnection))
    .build()


  "Quotient Familiale" should {
    "calcul the quotient Familiale" in new WithServer(app) {
      val response = await(WS.url("http://localhost:" + port + "/api/quotient-familliale").get())
      response.status must equalTo(OK)
    }

  }
}

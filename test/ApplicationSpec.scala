import org.specs2.mutable._
import org.specs2.runner._
import org.junit.runner._
import play.api.Configuration
import play.api.inject.guice.GuiceApplicationBuilder

import play.api.test._
import play.api.test.Helpers._

/**
 * Add your spec here.
 * You can mock out a whole application including requests, plugins etc.
 * For more information, consult the wiki.
 */
@RunWith(classOf[JUnitRunner])
class ApplicationSpec extends Specification {

  val app = new GuiceApplicationBuilder()
    .configure(Configuration("mongodb.uri" -> "mongodb://localhost:27017/sample-test"))
    .build()

  "Application" should {

    "send 404 on a bad request" in new WithApplication(app) {
      route(FakeRequest(GET, "/boum")) must beSome.which (status(_) == NOT_FOUND)
    }

    "send 200 on when getting all user" in new WithApplication(app) {
      route(FakeRequest(GET, "/api/users")) must beSome.which (status(_) == OK)
    }

  }
}

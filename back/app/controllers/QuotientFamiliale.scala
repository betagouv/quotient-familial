package controllers

import javax.inject.Inject

import models.JsonDeclarationFormats._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json._
import play.api.mvc.{Action, Controller, Result}
import services.SvairService

import scala.concurrent.Future


class QuotientFamiliale @Inject()(val qfService: SvairService) extends Controller {

  def get(numeroFiscal: String, referenceAvis: String) = Action.async {
    val result: Future[Result] = qfService.declaration(numeroFiscal, referenceAvis)
      .map {
        case Some(a) => Ok(Json.toJson(a))
        case None => NotFound(Json.obj("error" -> "justificatif d'impots non trouvé"))
      }
      .recover {
        case _ => InternalServerError("An error has occured")
      }
    result
  }
}

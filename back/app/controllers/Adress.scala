package controllers

import javax.inject.Inject

import models.JsonDeclarationFormats._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json._
import play.api.mvc.{Action, Controller}
import services.ApiParticulierService


class Adress @Inject()(val apiParticulier: ApiParticulierService) extends Controller {

  def get(numeroFiscal: String, referenceAvis: String) = Action.async {
    apiParticulier.adress(numeroFiscal, referenceAvis)
      .map {
        case Some(a) => Ok(a)
        case None => NotFound(Json.obj("error" -> "justificatif d'impots non trouvé"))
      }
      .recover {
        case _ => InternalServerError(Json.obj("error" -> "An error has occured"))
      }
  }
}

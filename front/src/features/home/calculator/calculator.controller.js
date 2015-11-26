export default class CalculatorController {
  constructor(SvairService, $mdToast) {
    this.svairService = SvairService;
    this.monthDivider = 12;
    this.requestPending = false;
    this.$mdToast = $mdToast;
  }

  getSvairInfo(numeroFiscal, referenceAvis) {
    this.requestPending = true;
    this.svairService.declaration(numeroFiscal, referenceAvis).then((data) => {
      this.nombreParts = data.nombreParts
      this.revenuFiscalReference = data.revenuFiscalReference
      this.calculateQuotientFamiliale()
      this.declarant1 = data.declarant1
      this.declarant2 = data.declarant2
      this.situationFamille = data.situationFamille
      this.aPayeDesImpots = data.montantImpot != null ? "Oui" : "Non"
      this.requestPending = false;
    }).catch(() => {
      this.$mdToast.simple()
        .content('Can\'t get your credencial')
        .hideDelay(3000)
      this.requestPending = false;
    })
  }
  calculateQuotientFamiliale() {
    this.quotientFamilial = this.revenuFiscalReference / this.nombreParts / this.monthDivider
  }

}

CalculatorController.$inject = ["SvairService", "$mdToast"]

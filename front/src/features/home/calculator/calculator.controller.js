export default class CalculatorController {
  constructor(SvairService) {
    this.svairService = SvairService;
    this.monthDivider = 12;
  }

  getSvairInfo(numeroFiscal, referenceAvis) {
    this.svairService.declaration(numeroFiscal, referenceAvis).then((data) => {
      this.nombreParts = data.nombreParts
      this.revenuFiscalReference = data.revenuFiscalReference
      this.calculateQuotientFamiliale()
    })
  }
  calculateQuotientFamiliale() {
    console.log("calculate !")
    this.quotientFamilial = this.revenuFiscalReference / this.nombreParts / this.monthDivider
  }


}

CalculatorController.$inject = ["SvairService"]

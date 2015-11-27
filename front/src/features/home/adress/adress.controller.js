export default class AdressController {
  constructor(SvairService, $mdToast) {
    this.svairService = SvairService;
    this.requestPending = false;
    this.$mdToast = $mdToast;
    this.lfCenter = {
        lat: 51.505,
        lng: -0.09,
        zoom: 8
    }
  }

  getAdresses(numeroFiscal, referenceAvis) {
    this.requestPending = true;
    this.svairService.adress(numeroFiscal, referenceAvis).then((data) => {
      this.adresses = data.adresses
      this.declarant1 = data.declarant1
      this.declarant2 = data.declarant2
      this.requestPending = false;
    })/*.catch(() => {
      this.$mdToast.simple()
        .content('Can\'t get your credencial')
        .hideDelay(3000)
      this.requestPending = false;
    })*/
  }
}

AdressController.$inject = ["SvairService", "$mdToast"]

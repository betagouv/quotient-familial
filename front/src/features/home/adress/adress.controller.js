export default class AdressController {
  constructor(SvairService, $mdToast) {
    this.svairService = SvairService;
    this.requestPending = false;
    this.$mdToast = $mdToast;
    this.lfCenter = {
        lat: 0,
        lng: 0,
        zoom: 10
    }
  }

  getAdresses(numeroFiscal, referenceAvis) {
    this.requestPending = true;
    this.svairService.adress(numeroFiscal, referenceAvis).then((data) => {
      this.adresses = data.adresses
      this.declarant1 = data.declarant1
      this.declarant2 = data.declarant2
      this.requestPending = false;
      if(data.adresses.length > 0) {
        const gps = data.adresses[0].geometry.coordinates
        this.lfCenter = {
            lat: gps[1],
            lng: gps[0],
            zoom: 14
        }
        this.lfMarkers = data.adresses.map((item) => {
          const gps = item.geometry.coordinates
          return {
                    lat: gps[1],
                    lng: gps[0],
                    message: item.adresse.label,
                    focus: true,
                    draggable: false,
                }
        })
      }

    })/*.catch(() => {
      this.$mdToast.simple()
        .content('Can\'t get your credencial')
        .hideDelay(3000)
      this.requestPending = false;
    })*/
  }
}

AdressController.$inject = ["SvairService", "$mdToast"]

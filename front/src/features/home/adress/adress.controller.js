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
      this.foyerFiscal = data.foyerFiscal.adresse
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
                    focus: false,
                    draggable: false,
                }
        })
        if(this.adresses.length > 0) {
          this.adresses[0].active= true;
          this.lfMarkers[0].focus = true
        }
      }

    }).catch(() => {
      this.$mdToast.simple()
        .content('Can\'t get your credencial')
        .hideDelay(3000)
      this.requestPending = false;
    })
  }

  centerOnAdress(index) {
    this.adresses.forEach((item) => {
      item.active = false
    })
    this.lfMarkers.forEach((item) => {
      item.focus = false
    })
    this.adresses[index].active = true
    this.lfMarkers[index].focus = true

    const gps = this.adresses[index].geometry.coordinates
    this.lfCenter = {
        lat: gps[1],
        lng: gps[0],
        zoom: 14
    }
  }
}

AdressController.$inject = ["SvairService", "$mdToast"]

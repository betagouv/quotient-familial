class SvairService {
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q
  }

  declaration(numeroFiscal, referenceAvis) {
    let url = '/api/quotient-familial';
    let deferred = this.$q.defer();
    numeroFiscal = (numeroFiscal + "").slice(0, 13)
    this.$http({
      method: 'GET',
      params: {
        numeroFiscal: numeroFiscal,
        referenceAvis: referenceAvis
      },
      url: url,
    }).then((response) => {
      deferred.resolve(response.data)
    }, (err) => {
      deferred.reject(err)
    });
    return deferred.promise;
  }

  adress(numeroFiscal, referenceAvis) {
    let url = '/api/adress';
    let deferred = this.$q.defer();
    this.$http({
      method: 'GET',
      params: {
        numeroFiscal: numeroFiscal,
        referenceAvis: referenceAvis
      },
      url: url,
    }).then((response) => {
      deferred.resolve(response.data)
    }, (err) => {
      deferred.reject(err)
    });
    return deferred.promise;
  }
}

SvairService.$inject = ['$http', '$q'];


export default angular.module('app.svair', [])
  .service('SvairService', SvairService)
  .name;

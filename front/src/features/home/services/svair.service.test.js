
import admin from './../index';

describe('Service: Svair', function() {
  let SvairService;
  let $httpBackend;

  beforeEach(angular.mock.module(admin));

  beforeEach(angular.mock.inject((_SvairService_, _$httpBackend_) => {
    SvairService = _SvairService_;
    $httpBackend = _$httpBackend_;
  }));

  describe('getting a declaration', () => {
    it('retreive the declaration', (done) => {
      var declaration = {
          "declarant1": {
              "nom": "GERY",
              "nomNaissance": "GERY",
              "prenoms": "THIBAUT",
              "dateNaissance": "29/03/1990"
          },
          "declarant2": {
              "nom": "",
              "nomNaissance": "",
              "prenoms": "",
              "dateNaissance": ""
          },
          "dateRecouvrement": "31/07/2015",
          "dateEtablissement": "08/07/2015",
          "nombreParts": 1,
          "situationFamille": "Célibataire",
          "nombrePersonnesCharge": 0,
          "revenuBrutGlobal": 12000,
          "revenuImposable": 12000,
          "impotRevenuNetAvantCorrections": 45,
          "montantImpot": 45,
          "revenuFiscalReference": 12000,
          "anneeImpots": "2015",
          "anneeRevenus": "2014"
      }

      $httpBackend.expectGET("/api/quotient-familial?numeroFiscal=1&referenceAvis=2").respond(200, declaration)
      var promise = SvairService.declaration(1, 2);
      promise.then((result) => {
        expect(result).toEqual(declaration)
        done();
      }, (err) => {
        expect("error" + err).toBeUndefined();
        done(err);
      })
      $httpBackend.flush();
    });
  })

  describe('getting a adress', () => {
    it('retreive the adress', (done) => {
      var adress = {
          "declarant1": {
              "nom": "GERY",
              "nomNaissance": "GERY",
              "prenoms": "THIBAUT",
              "dateNaissance": "29/03/1990"
          },
          "declarant2": {
              "nom": "",
              "nomNaissance": "",
              "prenoms": "",
              "dateNaissance": ""
          },
          adresses: []
      }

      $httpBackend.expectGET("/api/adress?numeroFiscal=1&referenceAvis=2").respond(200, adress)
      var promise = SvairService.adress(1, 2);
      promise.then((result) => {
        expect(result).toEqual(adress)
        done();
      }, (err) => {
        expect("error" + err).toBeUndefined();
        done(err);
      })
      $httpBackend.flush();
    });
  })
});

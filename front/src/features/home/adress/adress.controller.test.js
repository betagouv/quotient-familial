import home from './../index';

describe('Controller: adress', function() {
  let $controller;
  let SvairService;

  beforeEach(angular.mock.module(home));

  beforeEach(angular.mock.inject((_SvairService_, _$controller_) => {
    SvairService = _SvairService_;
    $controller = _$controller_;
  }));
  describe('initializing', () => {
    let ctrl
    it('doesn\'t show the loader', () => {
      ctrl = $controller("AdressController")
      expect(ctrl.requestPending).not.toBe(true);
    })
  })

  describe('after specifying the referenceAvis and numeroFiscal', () => {
    let ctrl
    beforeEach(() => {
      ctrl = $controller("AdressController");
    })

    describe('when clicking on calculate', () => {
      it('show the adreses', () => {
        spyOn(SvairService, 'adress').and.returnValue({
          then(callback) {
            callback({
              adresses:  ["add1", "add2"],
              declarant1: {nom: 'toto'},
              declarant2: {nom: 'tata'}

            })
            return {
              catch: function() {
              }
            }
          }
        });
        ctrl.getAdresses(1, 2);
        expect(ctrl.adresses).toEqual(["add1", "add2"])
        expect(ctrl.declarant1).toEqual({nom: 'toto'})
        expect(ctrl.declarant2).toEqual({nom: 'tata'})
        expect(SvairService.adress).toHaveBeenCalledWith(1, 2)
      })

      it('show the loader when the request is running', () => {
        spyOn(SvairService, 'adress').and.returnValue({
          then(callback) {
            expect(ctrl.requestPending).toBe(true);
            callback({
              revenuFiscalReference: 24000,
              nombreParts: 2
            })
            return {
              catch: function() {
              }
            }
          }
        });
        ctrl.getAdresses(1, 2);
        expect(ctrl.requestPending).not.toBe(true);
      })

    })
  })

});

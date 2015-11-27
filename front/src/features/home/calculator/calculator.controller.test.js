import home from './../index';

describe('Controller: Calculator', function() {
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
      ctrl = $controller("CalculatorController")
      expect(ctrl.requestPending).not.toBe(true);
    })
  })

  describe('after specifying the referenceAvis and numeroFiscal', () => {
    let ctrl
    beforeEach(() => {
      ctrl = $controller("CalculatorController");
    })

    describe('when clicking on calculate', () => {
      it('calculate the quotient famiale', () => {
        spyOn(SvairService, 'declaration').and.returnValue({
          then(callback) {
            callback({
              revenuFiscalReference: 24000,
              nombreParts: 2,
              declarant1: {nom: 'toto'},
              declarant2: {nom: 'tata'}

            })
            return {
              catch: function() {
              }
            }
          }
        });
        ctrl = $controller("CalculatorController");
        ctrl.getSvairInfo(1, 2);
        expect(ctrl.quotientFamilial).toEqual(1000)
        expect(ctrl.revenuFiscalReference).toEqual(24000)
        expect(ctrl.nombreParts).toEqual(2)
        expect(ctrl.declarant1).toEqual({nom: 'toto'})
        expect(ctrl.declarant2).toEqual({nom: 'tata'})
        expect(SvairService.declaration).toHaveBeenCalledWith(1, 2)
      })

      it('show the loader when the request is running', () => {
        spyOn(SvairService, 'declaration').and.returnValue({
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
        ctrl.getSvairInfo(1, 2);
        expect(ctrl.requestPending).not.toBe(true);
      })

    })
  })

});

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
              adresses:  [
                {
                  adresse: {
                    label: "label"
                  },
                  geometry: {
                    coordinates: [
                      2.455,
                      54.344
                    ]
                  }
                }
              ],
              declarant1: {nom: 'toto'},
              declarant2: {nom: 'tata'},
              foyerFiscal: {
                adresse:"not formated adress"
              }
            })
            return {
              catch: function() {
              }
            }
          }
        });
        ctrl.getAdresses(1, 2);
        expect(ctrl.declarant1).toEqual({nom: 'toto'})
        expect(ctrl.declarant2).toEqual({nom: 'tata'})
        expect(ctrl.foyerFiscal).toEqual("not formated adress")
        expect(ctrl.adresses[0].active).toEqual(true)
        expect(ctrl.lfCenter.lng).toEqual(2.455)
        expect(ctrl.lfCenter.lat).toEqual(54.344)
        expect(ctrl.lfCenter.zoom).toEqual(14)
        expect(ctrl.lfMarkers.length).toEqual(1)
        expect(ctrl.lfMarkers[0].lng).toEqual(2.455)
        expect(ctrl.lfMarkers[0].lat).toEqual(54.344)
        expect(ctrl.lfMarkers[0].message).toEqual("label")
        expect(ctrl.lfMarkers[0].focus).toEqual(true)
        expect(ctrl.lfMarkers[0].draggable).toEqual(false)
        expect(SvairService.adress).toHaveBeenCalledWith(1, 2)
      })

      it('show the loader when the request is running', () => {
        spyOn(SvairService, 'adress').and.returnValue({
          then(callback) {
            expect(ctrl.requestPending).toBe(true);
            callback({
              revenuFiscalReference: 24000,
              nombreParts: 2,
              adresses: [],
              foyerFiscal: {
                adresse:"not formated adress"
              }
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

      describe('when clicking on another adress', () => {
        beforeEach(() => {
          ctrl.adresses = [
            {
              adresse: {
                label: "label A"
              },
              geometry: {
                coordinates: [
                  2.455,
                  54.344
                ]
              },
              active: true
            },
            {
              adresse: {
                label: "label B"
              },
              geometry: {
                coordinates: [
                  2.455,
                  54.344
                ]
              }
            }
          ]
        })

        it('disable active filter on all the item the one we clicked on', () => {
          ctrl.centerOnAdress(1)
          expect(ctrl.adresses[0].active).toEqual(false)
          expect(ctrl.adresses[1].active).toEqual(true)
        })

      })
    })
  })

});

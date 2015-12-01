routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: require('./home.html')
    })
    .state('quotient-familial', {
      url: '/quotient-familial',
      template: require('./calculator/calculator.html'),
      controller: 'CalculatorController',
      controllerAs: 'calculator'
    })
    .state('adress', {
      url: '/adress',
      template: require('./adress/adress.html'),
      controller: 'AdressController',
      controllerAs: 'adress'
    })
}

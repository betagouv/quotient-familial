routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      title: "Site de démos",
      template: require('./home.html')
    })
    .state('quotient-familial', {
      url: '/quotient-familial',
      template: require('./calculator/calculator.html'),
      controller: 'CalculatorController',
      title: "Quotient familial",
      controllerAs: 'calculator'
    })
    .state('adress', {
      url: '/adress',
      title: "Localisateur de foyer fiscal",
      template: require('./adress/adress.html'),
      controller: 'AdressController',
      controllerAs: 'adress'
    })
}

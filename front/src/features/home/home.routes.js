routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: require('./calculator/calculator.html'),
      controller: 'CalculatorController',
      controllerAs: 'calculator'
    })
    .state('home.login', {
      url: '/login',
      template: require('./login/login.html'),
      controller: 'LoginController',
      controllerAs: 'login'
    })
}

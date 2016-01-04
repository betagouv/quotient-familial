addTitle.$inject = ["$rootScope"];

function addTitle($rootScope) {
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $rootScope.title = toState.title;
  });
}

export default addTitle

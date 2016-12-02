(function () {
  'use strict';
  app.controller('LoginCtrl', function LoginCtrl($scope, $http, $state) {
    $scope.login = function (data) {
      $http({
        method: 'POST',
        url: '/api/users/login',
        data: data
      }).then(function (response) {
        if (response.status === 200) {
          $state.go('main');
        }
      }, function (response) {
        console.error(response);
      });
    }
  });
})();

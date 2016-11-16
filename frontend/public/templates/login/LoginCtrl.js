(function () {
  'use strict';
  app.controller('LoginCtrl', function LoginCtrl($scope, $http, $state) {
    $scope.login = function (data) {
      console.log(data);
      $http({
        method: 'POST',
        url: '/api/users/authentificateUser',
        data: data
      }).then(function (response) {
        if (typeof response.headers('session-id') === 'number') {
          let sid = response.headers('session-id');
          $state.go('main');
        }
        console.log(response.headers('session-id'));
      }, function (response) {
        console.error(response);
      });
    }
  });
})();

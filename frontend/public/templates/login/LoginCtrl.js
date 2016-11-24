(function () {
  'use strict';
  app.controller('LoginCtrl', function LoginCtrl($scope, $http, $state) {
    $scope.login = function (data) {
      console.log(`credentials: ${data}`);
      $http({
        method: 'POST',
        url: '/api/users/login',
        data: data
      }).then(function (response) {
        let sid = Number(response.headers('session-id'));
        if (typeof sid === 'number') {
          let sid = response.headers('session-id');
          $state.go('auth.main');
        }
        console.log(response);
        console.log(response.headers('session-id'));
      }, function (response) {
        console.error(response);
      });
    }
  });
})();

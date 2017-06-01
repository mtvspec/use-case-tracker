(function () {
  'use strict';

  app.controller('MainCtrl', function MainCtrl($scope, $http, $state) {
    $scope.logOut = function (data) {
      $http({
        method: 'POST',
        url: '/api/users/logout',
        data: data
      }).then(function success(response) {
        if (response && response.status === 200) {
          $state.go('login');
        }
      }, function failure(response) {
        console.error(response);
      });
    }
  });

})();

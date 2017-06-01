(function () {
  'use strict';

  app.controller('MainCtrl', function MainCtrl($scope, $http, $state) {
    console.log('MainCtrl');
    $scope.logOut = function (data) {
      $http({
        method: 'POST',
        url: '/api/users/logout',
        data: data
      }).then(function success(response) {
        console.log(response);
        if (response && response.status === 200) {
          console.log('ok');
          $state.go('login');
        }
      }, function failure(response) {
        console.error(response);
      });
    }
  });

})();

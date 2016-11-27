(function () {
  'use strict';

  app.controller('SystemsCtrl', function SystemsCtrl($scope, $http) {
    function getSystems() {
      $http({
        url: '/api/systems/',
        method: 'GET'
      }).then(function (response) {
        console.log(response);
      }, function (response) {
        console.error(response);
      });
    }
    getSystems();
  });

})();

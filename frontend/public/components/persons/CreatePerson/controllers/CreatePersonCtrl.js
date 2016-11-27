(function () {
  'use strict';

  app.controller('CreatePersonCtrl', function CreatePersonCtrl($scope, $http) {

    var vm = this;

    vm.person = {};

    vm.createPerson = function(person) {
      $http({
        url: '/api/persons',
        method: 'POST',
        data: person
      }).then(function (response) {
        if (response.status === 201) {
          console.log(response.data);
        }
      }, function (response) {
        console.error(response);
      })
    }

  });

})();

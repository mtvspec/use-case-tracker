(function () {
  'use strict';

  app.controller('CreatePersonCtrl', function CreatePersonCtrl($modalInstance, $scope, $http) {

    let vm = this;

    vm.person = {};

    vm.createPerson = function (person) {
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

    vm.genders = [];

    (function getPersonGender() {
      $http({
        url: 'api/dict/person-genders',
        method: 'GET'
      }).then(function (response) {
        if (response.status === 200) {
          let len = response.data.length;
          for (let i = 0; i < len; i++) {
            vm.genders.push(response.data[i]);
          }
          return vm.genders;
        } else if (response.status === 204) {
          return vm.genders;
        }
      }, function (response) {
        console.error(response);
      });
    })();

    vm.cancel = function () {
      $modalInstance.dismiss();
    }

  });

})();

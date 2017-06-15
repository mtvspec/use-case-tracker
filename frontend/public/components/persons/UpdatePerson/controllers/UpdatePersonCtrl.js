(function () {
  'use strict';

  app.controller('UpdatePersonCtrl', function UpdatePersonCtrl($modalInstance, $http, person) {

    let vm = this;

    vm.person = angular.copy(person);

    vm.ok = function () {
      $http({
        url: `/api/persons/${vm.person.id}`,
        method: 'PUT',
        data: vm.person
      }).then(function (response) {
        if (response.status === 200) {
          $modalInstance.close(vm.person);
        } else {
          console.error(response);
        }
      }, function (response) {
        console.error(response);
      });
    }

    vm.cancel = function () {
      console.log('cancel');
      $modalInstance.dismiss();
    }

    vm.genders = [];

    vm.getPersonGender = function () {
      $http({
        url: 'api/dict/person-genders',
        method: 'GET'
      }).then(function (response) {
        if (response.status === 200) {
          let len = response.data.length;
          for (let i = 0; i < len; i++) {
            vm.genders.push(response.data[i]);
          }
          console.log(vm.genders);
          return vm.genders;
        } else if (response.status === 204) {
          return vm.genders;
        }
      }, function (response) {
        console.error(response);
      });
    } 

    vm.getPersonGender();

  });
})();
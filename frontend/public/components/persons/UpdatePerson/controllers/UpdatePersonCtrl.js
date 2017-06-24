(function () {
  'use strict';

  app.controller('UpdatePersonCtrl', function UpdatePersonCtrl($modalInstance, $http, PersonAPI, person) {

    let vm = this;

    vm.genders = PersonAPI.genders;

    vm.person = angular.copy(person);

    vm.save = function () {
      PersonAPI.updatePerson(vm.person, function (response) {
        if (response.status === 200) {
          $modalInstance.close(vm.person);
        }
      })
    }

    vm.cancel = function () {
      $modalInstance.dismiss();
    }

  });
})();
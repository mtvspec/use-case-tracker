(function () {
  'use strict';

  app.controller('UpdatePersonCtrl', function UpdatePersonCtrl($modalInstance, $http, PersonAPI, person) {

    let vm = this;

    vm.genders = PersonAPI.genders;

    vm.person = angular.copy(person);

    vm.save = function () {
      PersonAPI.updatePerson(vm.person).then(res => {
        if (res === 200) $modalInstance.close(vm.person);
      }, err => console.error(err));
    }

    vm.cancel = function () {
      $modalInstance.dismiss();
    }

  });
})();
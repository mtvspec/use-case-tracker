(function () {
  'use strict';

  app.controller('CreatePersonCtrl', function CreatePersonCtrl($modalInstance, PersonAPI) {

    let vm = this;

    vm.person = {};

    vm.genders = PersonAPI.genders;

    vm.createPerson = function (person) {
      PersonAPI.createPerson(person).then(res => {
        if (res === 201) $modalInstance.close()
      }, (err) => {
        console.error(err)
      })
    }

    vm.cancel = function () {
      $modalInstance.dismiss();
    }

  });

})();

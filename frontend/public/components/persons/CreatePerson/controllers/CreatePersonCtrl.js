(function () {
  'use strict';

  app.controller('CreatePersonCtrl', function CreatePersonCtrl($modalInstance, PersonAPI) {

    let vm = this;

    vm.person = {};

    vm.genders = PersonAPI.genders;
    
    vm.createPerson = function (person) {
      if (typeof person.aPersonFirstName === 'string' && person.aPersonFirstName.length >= 2 && person.aPersonFirstName.length <= 100) {
        PersonAPI.createPerson(person);
        $modalInstance.close();
      }
    }

    vm.cancel = function () {
      $modalInstance.dismiss();
    }

  });

})();

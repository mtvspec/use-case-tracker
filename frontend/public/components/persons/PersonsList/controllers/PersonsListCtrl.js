(function () {
  'use strict';

  app.controller('PersonsListCtrl', function PersonsListCtrl($http, $modal, socket, PersonAPI) {

    let vm = this;

    vm.persons = PersonAPI.persons;
    vm.genders = PersonAPI.genders;

    vm.person = {};    

    vm.getPersonGenderByID = function (genderID) {
      let len = vm.genders.length;
      for (let i = 0; i < len; i++) {
        if (vm.genders[i].id == genderID) {
          return vm.genders[i].aDictValueNameRU;
        };
      }
    }  

    vm.openCreatePersonModal = function () {
      let modal = $modal.open({
        templateUrl: 'components/persons/CreatePerson/views/template.html',
        controller: 'CreatePersonCtrl as vm'
      });
    }

    vm.openUpdatePersonModal = function (person) {
      let modal = $modal.open({
        templateUrl: 'components/persons/UpdatePerson/views/template.html',
        controller: 'UpdatePersonCtrl as vm',
        resolve: {
          person: function () {
            return person
          }
        }
      });
      modal.result.then(function (res) {
        if (res && res.id) {
          Object.assign(person, res);
        }
      });
    }

    vm.deletePerson = function(personID) {
      PersonAPI.deletePerson(personID);
    }
    
    vm.restorePerson = function (personID) {
      PersonAPI.restorePerson(personID);
    }

  });
})();

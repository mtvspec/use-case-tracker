(function () {
  'use strict';

  app.controller('PersonsListCtrl', function PersonsListCtrl($modal, PersonAPI) {

    let vm = this;

    vm.genders = PersonAPI.genders;    
    vm.persons = PersonAPI.persons;

    vm.getPersonGenderByID = function (id) {
      for (let i in vm.genders) {
        if (vm.genders[i].id == id) {
          return vm.genders[i].aDictValueNameRU;
        };
      }
    }  

    vm.openCreatePersonModal = function () {
      let modal = $modal.open({
        templateUrl: 'modules/user/person/person-create/person-create-tmpl.html',
        controller: 'CreatePersonCtrl as vm'
      });
    }

    vm.openUpdatePersonModal = function (person) {
      let modal = $modal.open({
        templateUrl: 'modules/user/person/person-update/person-update-tmpl.html',
        controller: 'UpdatePersonCtrl as vm',
        resolve: {
          person: function () {
            return person
          }
        }
      });
      modal.result.then(res => {
        if (res && res.id) {
          Object.assign(person, res);
        }
      });
    }

    vm.deletePerson =  function(id) {
      PersonAPI.deletePerson(id); 
    }
    
    vm.restorePerson = function(id) {
      PersonAPI.restorePerson(id);
    }

  });
})();

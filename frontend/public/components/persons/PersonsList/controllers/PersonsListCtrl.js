(function () {
  'use strict';

  app.controller('PersonsListCtrl', function PersonsListCtrl($http, $modal) {

    let window = document;

    let vm = this;

    vm.persons = [];

    vm.person = {};

    vm.openCreatePersonModal = function () {
      let modal = $modal.open({
        templateUrl: 'components/persons/CreatePerson/views/template.html',
        controller: 'CreatePersonCtrl as vm'
      });
    }

    vm.openUpdatePersonModal = function (person) {
      let modal = $modal.open({
        templateUrl: 'components/persons/PersonsList/views/updatePersonTmpl.html',
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

    vm.createPerson = function (person) {
      $http({
        url: '/api/persons',
        method: 'POST',
        data: person
      }).then(function (response) {
        if (response.status === 201) {
          person.id = response.data.id;
          person.isDeleted = false;
          vm.persons.push(person);
          $('#createPerson')
            .modal('hide')
            .removeData();
          return vm.persons;
        }
      }, function (response) {
        console.error(response);
      })
    }

    vm.getPersons = function () {
      $http({
        url: '/api/persons',
        method: 'GET'
      }).then(function (response) {
        if (response.status === 200) {
          let len = response.data.length;
          for (let i = 0; i < len; i++) {
            vm.persons.push(response.data[i]);
          }
          return vm.persons;
        } else if (response.status === 204) {
          return vm.persons;
        }
      }, function (response) {
        console.error(response);
      });
    }

    vm.getPersons();

    vm.deletePerson = function (personID) {
      $http({
        url: `/api/persons/${personID}`,
        method: 'DELETE'
      }).then(function (response) {
        if (response.status === 200) {
          for (let i = 0; i < vm.persons.length; i++) {
            if (vm.persons[i].id === response.data.delete_person) {
              vm.persons[i].isDeleted = true;
              break;
            }
          }
        } else {
          console.error(response);
        }
      }, function (response) {
        console.error(response);
      });
    }

    vm.restorePerson = function (personID) {
      $http({
        url: `/api/persons/${personID}`,
        method: 'OPTIONS'
      }).then(function (response) {
        if (response.status === 200) {
          for (let i = 0; i < vm.persons.length; i++) {
            if (vm.persons[i].id === response.data.restore_person) {
              vm.persons[i].isDeleted = false;
              break;
            }
          }
        } else {
          console.error(response);
        }
      }, function (response) {
        console.error(response);
      });
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
          console.log(vm.genders);
          return vm.genders;
        } else if (response.status === 204) {
          return vm.genders;
        }
      }, function (response) {
        console.error(response);
      });
    })();

    vm.getPersonGenderByID = function (genderID) {
      let len = vm.genders.length;
      for (let i = 0; i < len; i++) {
        if (vm.genders[i].id == genderID) {
          return vm.genders[i].aDictValueNameRU;
        };
      }
    }

  });
})();

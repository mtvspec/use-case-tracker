(function () {
  'use strict';

  app.controller('PersonsListCtrl', function PersonsListCtrl($http) {

    let vm = this;

    vm.persons = [];

    vm.person = {};

    vm.createPerson = function(person) {
      $http({
        url: '/api/persons',
        method: 'POST',
        data: person
      }).then(function (response) {
        if (response.status === 201) {
          person.id = response.data.id;
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

  });
})();

(function () {
  'use strict';

  app.controller('PersonsCtrl', function PersonsCtrl(PersonAPI, $scope, $http) {
    console.log('PersonsCtrl');

    $scope.persons = [];

    PersonAPI.getPersons().then(function (data) {
      console.log(data);
      for (let i = 0, len = data.length; i < len; i++) {
        $scope.persons.push(data[i]);
      }
      return $scope.persons;
    });

    $scope.createPerson = function CreatePerson(person) {
        $http({
          method: 'POST',
          url: '/api/persons',
          headers: {
            'user-id': 1
          },
          data: person
        }).then(function (response) {
          if (response.status === 201 && typeof response.data.id === 'number') {
            person.id = response.data.id;
            $scope.persons.push(person);
          };
        }, function (error) {
          console.log(error);
        });

      }

  });

  app.service('PersonAPI', function PersonAPI ($http) {
    this.getPersons = function () {
      return $http({
        method: 'GET',
        url: `/api/persons`,
        headers: {
          'user-id': 1
        }
      }).then(function (response) {
        if (response.status === 200) {
          return response.data;
        }
      }, function (response) {
        console.error(response);
      });
    }
  });

})();

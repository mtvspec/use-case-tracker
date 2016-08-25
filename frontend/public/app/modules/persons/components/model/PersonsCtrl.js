(function () {
  'use strict';

  app.controller('PersonsCtrl', function PersonsCtrl(PersonAPI) {

    var vm = this;

    var persons = [];

    PersonAPI.getPersons().then(function (data) {
      for (let i = 0; i < data.length; i++) {
        persons.push(data[i]);
      }
      return persons;
    });
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

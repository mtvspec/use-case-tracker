(function () {
  'use strict';

  app.controller('UsersCtrl', function UsersCtrl($http) {
    var vm = this;

    vm.user = {

    }

    vm.users = [];

    function getUsers() {
      $http({
        url: '/api/users',
        method: 'GET'
      });
    }

    getUsers();

  });
})();

'use strict';

app.controller('CreateUserCtrl', function CreateUserCtrl($http) {
  var vm = this;

  function createUser(userData) {
    $http({
      url: '/api/users',
      method: 'POST',
      data: userData
    });
  }

});

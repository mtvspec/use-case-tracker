'use strict';

var app = angular.module('app', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: '/templates/login/login.html',
    controllerAs: 'LoginCtrl'
  })
  .state('main', {
    url: '/',
    templateUrl: 'main.html',
    controllerAs: 'TestCtrl'
  })
  .state('contacts', {
    url: '/contacts',
    templateUrl: 'contacts.html'
  });
})

app.controller('TestCtrl', function TestCtrl($scope, $http) {


  getPersons();

  function getPersons() {
    $http({
      method: 'GET',
      url: '/api/persons',
      headers: {
        'user-id': 1
      }
    }).then(function (response) {
      $scope.persons = response.data;
    }, function (error) {
      console.error(error);
    });
  }

  $scope.isPerson = function (person) {
    if (person) {
      if (person.iin
      && typeof person.iin === 'string'
      && person.iin.length === 12) {
        console.log('iin true');
      } else {
        console.log('iin false');
      }
      console.debug(true);
      return true;
    } else {
      console.debug(false);
      return false;
    }
  }


  $scope.CreatePerson = function CreatePerson(person) {
    console.log(person);
    $http.post('/api/users', person, {
      headers: {
        'Content-Type': 'application/json',
        'user-id': 1
      }
    }).success(function (data, status) {
      console.log(data, status);
    }).error(function (error) {
      console.log(error);
    });

  }


})

'use strict';

const app = angular.module('app', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
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


  $http({
    method: 'GET',
    url: '/api/persons'
  }).then(function (response) {
    $scope.persons = response.data;
  }, function (error) {
    console.error(error);
  });

  $scope.CreatePerson = function(person) {
    $http({
      method: 'POST',
      url: '/api/persons',
      data: person
    }).then(function (response) {
      console.log(response);
    }, function (response) {
      console.error(response);
    });
  }

  $scope.tests = [
    {
      name: 'Nexus'
    },
    {
      name: 'Apple'
    }
  ]
})

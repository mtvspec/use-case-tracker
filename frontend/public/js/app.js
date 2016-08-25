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
  .state('persons', {
    url: '/persons',
    templateUrl: 'main.html',
    controller: 'PersonsCtrl',
    controllerAs: 'vm'
  })
  .state('contacts', {
    url: '/contacts',
    templateUrl: 'contacts.html'
  });
});

app.component('persons', {
  templateUrl: 'main.html',
  controller: 'PersonsCtrl'
});

console.log('app');

// app.controller('TestCtrl', function TestCtrl($scope, $http, PersonAPI) {
//
//   $scope.persons = PersonAPI.getPersons();
//
//   // function getPersons() {
//   //   $http({
//   //     method: 'GET',
//   //     url: '/api/persons',
//   //     headers: {
//   //       'user-id': 1
//   //     }
//   //   }).then(function (response) {
//   //     if (response.status === 200 && response.data.length > 0) {
//   //       for (let i = 0; i < response.data.length; i++) {
//   //         $scope.persons.push(response.data[i]);
//   //       }
//   //       console.log($scope.persons);
//   //       return $scope.persons;
//   //     }
//   //     $scope.persons = response.data;
//   //   }, function (error) {
//   //     console.error(error);
//   //   });
//   // }
//
//   $scope.isPerson = function (person) {
//     if (person) {
//       if (person.iin
//       && typeof person.iin === 'string'
//       && person.iin.length === 12) {
//         console.log('iin true');
//       } else {
//         console.log('iin false');
//       }
//       console.debug(true);
//       return true;
//     } else {
//       console.debug(false);
//       return false;
//     }
//   }
//
//
//   $scope.createPerson = function CreatePerson(person) {
//     $http({
//       method: 'POST',
//       url: '/api/persons',
//       headers: {
//         'user-id': 1
//       },
//       data: person
//     }).then(function (response) {
//       if (response.status === 201 && typeof response.data.create_person === 'number') {
//         person.id = response.data.create_person;
//         $scope.persons.push(person);
//       };
//     }, function (error) {
//       console.log(error);
//     });
//
//   }
// })

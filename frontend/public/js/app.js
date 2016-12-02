'use strict';

var app = angular.module('app', ['ui.router', 'ngMaterial']);

app.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: '/templates/login/login.html',
    controller: 'LoginCtrl',
    data: {
      pageTitle: 'Authorization'
    }
  })
  .state('auth', {
    abstract: true
  })
  .state('createPerson', {
    url: '/createPerson',
    templateUrl: '/components/persons/CreatePerson/views/template.html',
    controller: 'CreatePersonCtrl',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Create person'
    }
  })
  .state('createDefectReport', {
    url: '/createDefectReport',
    templateUrl: '/components/defect-reports/createDefectReport/views/template.html',
    controller: 'CreateDefectReportCtrl',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Create defect report'
    }
  })
  .state('createUseCaseSubject', {
    url: '/createUseCaseSubject',
    templateUrl: '/components/use-case-subjects/createUseCaseSubject/views/template.html',
    controller: 'CreateUseCaseSubjectCtrl',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Create use-case subject'
    }
  })
  .state('createUseCaseSlice', {
    url: '/createUseCaseSlice',
    templateUrl: '/components/use-case-slices/createUseCaseSlice/views/template.html',
    controller: 'CreateUseCaseSliceCtrl',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Create use-case slice'
    }
  })
  .state('projects', {
    url: '/projects',
    templateUrl: '/components/projects/views/template.html',
    controller: 'ProjectsCtrl',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Projects'
    }
  })
  .state('systems', {
    url: '/systems',
    templateUrl: '/components/systems/views/template.html',
    controller: 'SystemsCtrl',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Systems'
    }
  })
  .state('createProject', {
    url: '/createProject',
    controller: 'CreateProjectCtrl',
    controllerAs: 'vm',
    templateUrl: '/components/projects/createProject/views/template.html',
  })
  .state('createSystem', {
    url: '/createSystem',
    templateUrl: '/components/systems/views/createSystem.html',
    controller: 'CreateSystemCtrl',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Create system'
    }
  })
  .state('customers', {
    url: '/customers',
    templateUrl: '/components/customers/customersList/views/template.html',
    controller: 'CustomersCtrl',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Customers'
    }
  })
  .state('use-case-subjects', {
    url: '/use-case-subjects',
    templateUrl: '/components/use-case-subjects/UseCaseSubjectList/views/template.html',
    controller: 'UseCaseSubjectListCtrl',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Use-case subjects'
    }
  })
  .state('use-case-slices', {
    url: '/use-case-slices',
    templateUrl: '/templates/use-case-slices/template.html',
    controller: 'UseCaseSliceCtrl',
    controllerAs: 'vm'
  })
  .state('organizations', {
    url: '/organizations',
    templateUrl: '/components/organizations/OrganizationsList/views/template.html',
    controller: 'OrganizationsCtrl',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Organizations'
    }
  })
  .state('persons', {
    url: '/persons',
    templateUrl: '/components/persons/PersonsList/views/template.html',
    controller: 'PersonsListCtrl',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Persons'
    }
  })
  .state('contacts', {
    url: '/contacts',
    templateUrl: 'contacts.html'
  });
  $mdThemingProvider.theme('default')

});

app.directive('title', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      link: function() {

        var listener = function(event, toState) {

          $timeout(function() {
            $rootScope.title = (toState.data && toState.data.pageTitle)
            ? toState.data.pageTitle
            : 'Default title';
          });
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  }
]);

// app.component('persons', {
//   templateUrl: 'main.html',
//   controller: 'PersonsCtrl'
// });

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

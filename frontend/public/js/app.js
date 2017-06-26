'use strict';

let app = angular.module('app', ['ui.router', 'ui.bootstrap']);

app.config(function ($stateProvider, $urlRouterProvider) {
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
    .state('main', {
      url: '/main',
      templateUrl: '/templates/main/main.html',
      controller: 'MainCtrl',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Main'
      }
    })
    .state('main.projects', {
      name: 'projects',
      url: '/projects',
      templateUrl: '/components/projects/views/template.html',
      controller: 'ProjectsCtrl',
      controllerAs: 'vm'
    })
    .state('main.persons', {
      url: '/persons',
      templateUrl: '/components/persons/PersonsList/views/template.html',
      controller: 'PersonsListCtrl',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Persons'
      }
    })
    .state('OrgChart', {
      url: '/orgChart',
      templateUrl: '/components/org-chart/template.html',
      controller: 'OrgChatCtrl',
      controllerAs: 'vm',
      data: {
        pageTitle: 'OrgChart'
      }
    })
    .state('main.systems', {
      url: '/systems',
      templateUrl: '/components/systems/views/template.html',
      controller: 'SystemsCtrl',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Systems'
      }
    })
    .state('main.customers', {
      url: '/customers',
      templateUrl: '/components/customers/customersList/views/template.html',
      controller: 'CustomersCtrl',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Customers'
      }
    })
    .state('main.issues', {
      url: '/issues',
      templateUrl: '/components/issues/issuesList/views/template.html',
      controller: 'IssuesListCtrl',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Issues'
      }
    })
    .state('main.tracker', {
      url: '/tracker',
      templateUrl: '/components/use-case-subjects/UseCaseSubjectList/views/template.html',
      controller: 'UseCaseSubjectListCtrl',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Use-case subjects'
      }
    })
    .state('main.use-case-slices', {
      url: '/use-case-slices',
      templateUrl: '/templates/use-case-slices/template.html',
      controller: 'UseCaseSliceCtrl',
      controllerAs: 'vm'
    })
    .state('main.organizations', {
      url: '/organizations',
      templateUrl: '/components/organizations/OrganizationsList/views/template.html',
      controller: 'OrganizationsCtrl',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Organizations'
      }
    })
    .state('main.tables', {
      url: '/tables',
      templateUrl: '/components/tables/views/template.html'
    });
});

app.directive('title', ['$rootScope', '$timeout',
  function ($rootScope, $timeout) {
    return {
      link: function () {

        var listener = function (event, toState) {

          $timeout(function () {
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

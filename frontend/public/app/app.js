'use strict';

let app = angular.module('app', ['ui.router', 'ui.bootstrap']);

app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/main');
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'modules/user/user/user-login/user-login-tmpl.html',
      controller: 'LoginCtrl',
      data: {
        pageTitle: 'Authorization'
      }
    })
    .state('main', {
      url: '/main',
      templateUrl: 'modules/user/main/main-tmpl.html',
      controller: 'MainCtrl',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Main'
      }
    })
    .state('main.projects', {
      name: 'projects',
      url: '/projects',
      templateUrl: 'modules/user/project/project-list/project-list-tmpl.html',
      controller: 'ProjectsCtrl',
      controllerAs: 'vm'
    })
    .state('main.persons', {
      url: '/persons',
      templateUrl: 'modules/user/person/person-list/person-list-tmpl.html',
      controller: 'PersonsListCtrl',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Persons'
      }
    })
    .state('OrgChart', {
      url: '/orgChart',
      templateUrl: 'modules/user/org-chart/org-chart-tmpl.html',
      controller: 'OrgChatCtrl',
      controllerAs: 'vm',
      data: {
        pageTitle: 'OrgChart'
      }
    })
    .state('main.customers', {
      url: '/customers',
      templateUrl: 'modules/user/customer/customer-list/customer-list-tmpl.html',
      controller: 'CustomersCtrl',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Customers'
      }
    })
    .state('main.issues', {
      url: '/issues',
      templateUrl: 'modules/user/issue/issue-list/issue-list-tmpl.html',
      controller: 'IssuesListCtrl',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Issues'
      }
    })
    .state('main.issues.new', {
      url: '/new',
      controller: 'CreateIssueCtrl',
      controllerAs: 'vm',
      templateUrl: 'modules/user/issue/issue-create/issue-create-tmpl.html'
    })
    .state('main.organizations', {
      url: '/organizations',
      templateUrl: 'modules/user/organization/organization-list/organization-list-tmpl.html',
      controller: 'OrganizationsCtrl',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Organizations'
      }
    })
    .state('main.tables', {
      url: '/tables',
      templateUrl: 'modules/user/table/template.html'
    })
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

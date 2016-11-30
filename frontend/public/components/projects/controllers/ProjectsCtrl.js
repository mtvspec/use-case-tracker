(function () {
  'use strict';

  app.controller('ProjectsCtrl', function ProjectsCtrl($scope, $http, ProjectAPI, CustomerAPI, $mdDialog) {

    var vm = this;

    CustomerAPI.getCustomers(function (customers) {
      vm.customers = customers;
    })

    vm.project = {};

    ProjectAPI.getProjects(function (projects) {
      vm.projects = projects;
    });

    ProjectAPI.getProjectKinds(function (projectKinds) {
      vm.projectKinds = projectKinds;
    });

    vm.createProject = function (project) {
      ProjectAPI.createProject(project);
      vm.project = null;
    }

    vm.showDialog = function(ev) {
      $mdDialog.show({
        templateUrl: 'components/projects/createProject/views/template.html',
        controller: 'CreateProjectCtrl',
        targetEvent: ev
      });
    }

    vm.closeDialog = function () {
      $mdDialog.hide();
    }

    vm.getProjectCustomerName = function (id) {
      let len = vm.customers.length;
      for (let i = 0; i < len; i++) {
        if (vm.customers[i].id == id) {
          return vm.customers[i].aCustomerName;
        }
      }
    }

  });
})();

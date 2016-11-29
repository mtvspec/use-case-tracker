(function () {
  'use strict';

  app.controller('ProjectsCtrl', function ProjectsCtrl($scope, $http, ProjectsAPI, CustomerAPI) {

    var vm = this;

    CustomerAPI.getCustomers(function (customers) {
      vm.customers = customers;
    })

    vm.project = {};

    ProjectsAPI.getProjects(function (projects) {
      vm.projects = projects;
    });

    ProjectsAPI.getProjectKinds(function (projectKinds) {
      vm.projectKinds = projectKinds;
    });

    vm.createProject = function (project) {
      ProjectsAPI.createProject(project);
      vm.project = null;
    }

    vm.getProjectKindName = function (id) {
      if (vm.projectKinds && vm.projectKinds.length > 0) {
        let len = vm.projectKinds.length;
        for (let i = 0; i < len; i++) {
          if (vm.projectKinds[i].id == id) {
            return vm.projectKinds[i].aProjectKindNameRU;
          }
        }
      }
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

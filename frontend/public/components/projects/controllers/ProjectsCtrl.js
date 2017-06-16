(function () {
  'use strict';

  app.controller('ProjectsCtrl', function ProjectsCtrl($scope, $http, ProjectAPI, CustomerAPI) {

    var vm = this;

    vm.projectKinds = [];
    
    ProjectAPI.getProjectKinds(function (projectKinds) {
      vm.projectKinds = projectKinds;
    });

    CustomerAPI.getCustomers(function (customers) {
      vm.customers = customers;
    })

    vm.project = {};
    vm.projects = [];
    
    
    ProjectAPI.getProjects(function (projects) {
      vm.projects = projects;
    });

    vm.getProjectKindNameRU = function(id) {
      let len = vm.projectKinds.length;
      for (let i = 0; i < len; i++) {
        if (vm.projectKinds[i].id == id) {
          return vm.projectKinds[i].aDictValueNameRU;
        }
      }
    }

    vm.createProject = function (project) {
      ProjectAPI.createProject(project);
      vm.project = null;
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

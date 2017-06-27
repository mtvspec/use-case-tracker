(function () {
  'use strict';

  app.controller('ProjectsCtrl', function ProjectsCtrl(ProjectAPI, CustomerAPI, OrganizationAPI, $modal) {

    var vm = this;

    vm.projectKinds = ProjectAPI.projectKinds;
    vm.projects = ProjectAPI.projects;
    vm.customers = CustomerAPI.customers;
    vm.organizations = OrganizationAPI.organizations;   

    vm.getProjectKindNameRU = function(id) {
      for (let i in vm.projectKinds) {
        if (vm.projectKinds[i].id == id) {
          return vm.projectKinds[i].aDictValueNameRU;
        }
      }
    }
    
    vm.getOrganizationShortName = function (id) {
      for (let i in vm.customers) {
        if (vm.customers[i].eOrganizationID == id) {
          for (let i in vm.organizations) {
            if (vm.organizations[i].id == getCustomerID(vm.customers[i].id)) {
              return vm.organizations[i].aOrganizationShortName;
            }
          }
        }
      }
    }

    function getCustomerID(id) {
      console.log(id);
      for (let i in vm.customers) {
        if (vm.customers[i].id === id) {
          return vm.customers[i].id;
        }
      }
    }

    vm.openCreateProjectModal = function () {
      let modal = $modal.open({
        backdrop: 'static',
        templateUrl: 'modules/user/project/project-create/project-create-tmpl.html',
        controller: 'CreateProjectCtrl as vm',
        size: 'lg'
      });
    }
    
    vm.openShowProjectInfoModal = function (project) {
      let modal = $modal.open({
        templateUrl: 'modules/user/project/project-show-info/project-show-info-tmpl.html',
        controller: 'ShowProjectInfoCtrl as vm',
        resolve: {
          project: function () {
            return project
          }
        },
        size: 'lg'
      });
      modal.result.then(function (res) {
        if (res && res.id) {
          Object.assign(project, res);
        }
      });
    }

    vm.getProjectCustomerName = function (id) {
      for (let i in vm.customers) {
        if (vm.customers[i].id == id) {
          return vm.customers[i].aCustomerName;
        }
      }
    }

  });
})();

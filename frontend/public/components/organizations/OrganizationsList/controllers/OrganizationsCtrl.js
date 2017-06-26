(function () {
  'use strict';

  app.controller('OrganizationsCtrl', function OrganizationsCtrl(OrganizationAPI, $modal) {
    
    let vm = this;

    vm.organizations = OrganizationAPI.organizations;

    vm.openCreateOrganizationModal = () => {
      let modal = $modal.open({
        templateUrl: 'components/organizations/CreateOrganization/views/template.html',
        controller: 'CreateOrganizationCtrl as vm'
      });
    }

    vm.openUpdateOrganizationModal = function (organization) {
      let modal = $modal.open({
        templateUrl: 'components/organizations/UpdateOrganization/views/template.html',
        controller: 'UpdateOrganizationCtrl as vm',
        resolve: {
          organization: function () {
            return organization
          }
        }
      });
      modal.result.then(function (res) {
        if (res && res.id) {
          Object.assign(organization, res);
        }
      });
    }
    
    vm.deleteOrganization = function(organizationID) {
      OrganizationAPI.deleteOrganization(organizationID);
    }
    
    vm.restoreOrganization = function (organizationID) {
      OrganizationAPI.restoreOrganization(organizationID);
    }
    

  });

})();

(function () {
  'use strict';

  app.controller('OrganizationsCtrl', function OrganizationsCtrl(OrganizationAPI, $modal) {
    
    let vm = this;

    vm.organizations = OrganizationAPI.organizations;

    vm.openCreateOrganizationModal = () => {
      let modal = $modal.open({
        templateUrl: 'modules/user/organization/organization-create/organization-create-tmpl.html',
        controller: 'CreateOrganizationCtrl as vm'
      });
    }

    vm.openUpdateOrganizationModal = function (organization) {
      let modal = $modal.open({
        templateUrl: 'modules/user/organization/organization-update/organization-update-tmpl.html',
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

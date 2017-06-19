(function () {
  'use strict';

  app.controller('CreateOrganizationCtrl', function CreateOrganizationCtrl(OrganizationAPI, $modalInstance) {
    
    let vm = this;

    vm.organization = {};
    
    vm.add = function (organization) {
      if (typeof organization.aOrganizationShortName === 'string' && organization.aOrganizationShortName.length >= 2 && organization.aOrganizationShortName.length <= 1000) {
        OrganizationAPI.createOrganization(organization);
        $modalInstance.close();
      }
    }

    vm.cancel = function () {
      $modalInstance.dismiss();
    }
    
  });

})();

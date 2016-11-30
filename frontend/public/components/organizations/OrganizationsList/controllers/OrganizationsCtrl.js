(function () {
  'use strict';

  app.controller('OrganizationsCtrl', function OrganizationsCtrl(OrganizationAPI) {
    let vm = this;

    vm.organization = {};

    vm.createOrganization = function (organization) {
      OrganizationAPI.createOrganization(organization);
    }

    OrganizationAPI.getOrganizations(function (organizations) {
      console.log(organizations);
      vm.organizations = organizations;
    });

  });

})();

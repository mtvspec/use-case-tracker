(function () {
  'use strict';

  app.controller('CreateOrganizationCtrl', function CreateOrganizationCtrl(OrganizationAPI) {
    OrganizationAPI.createOrganization(organization);
  });

})();

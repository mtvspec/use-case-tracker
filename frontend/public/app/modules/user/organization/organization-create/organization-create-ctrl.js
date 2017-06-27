(function () {
  'use strict';

  app.controller('CreateOrganizationCtrl', function CreateOrganizationCtrl(OrganizationAPI, $modalInstance) {

    let vm = this;

    vm.organization = {};

    vm.add = (data) => {
      OrganizationAPI.createOrganization(data).then(res => {
        if (res === 201) $modalInstance.close();
      }, (err) => {
        console.error(err);
      });
    }

    vm.cancel = function () {
      $modalInstance.dismiss();
    }

  });

})();

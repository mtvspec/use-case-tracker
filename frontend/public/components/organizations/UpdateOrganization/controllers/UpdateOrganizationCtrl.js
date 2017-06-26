(function () {
  'use strict';

  app.controller('UpdateOrganizationCtrl', function UpdateOrganizationCtrl($modalInstance, $http, OrganizationAPI, organization) {

    let vm = this;

    vm.organization = angular.copy(organization);

    vm.save = function () {
      OrganizationAPI.updateOrganization(vm.organization).then(res => {
        if (res === 200) $modalInstance.close(vm.organization);
      }, err => console.error(err));
    }

    vm.cancel = function () {
      $modalInstance.dismiss();
    }

  });
})();
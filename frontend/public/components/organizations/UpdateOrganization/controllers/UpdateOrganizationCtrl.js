(function () {
  'use strict';

  app.controller('UpdateOrganizationCtrl', function UpdateOrganizationCtrl($modalInstance, $http, OrganizationAPI, organization) {

    let vm = this;

    vm.organization = angular.copy(organization);

    vm.save = function () {
      OrganizationAPI.updateOrganization(vm.organization, function (response) {
        if (response.status === 200) {
          $modalInstance.close(vm.organization);
        }
      })
    }

    vm.cancel = function () {
      $modalInstance.dismiss();
    }

  });
})();
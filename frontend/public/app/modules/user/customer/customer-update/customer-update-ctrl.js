(function () {
  'use strict';

  app.controller('UpdateCustomerCtrl', function UpdateCustomerCtrl($modalInstance, CustomerAPI, customer) {

    let vm = this;

    vm.customer = angular.copy(customer);

    vm.save = () => {
      CustomerAPI.updatePerson(vm.customer).then(res => {
        if (res === 200) $modalInstance.close(vm.customer);
      }, err => console.error(err));
    }

    vm.cancel = function () {
      $modalInstance.dismiss();
    }

    vm.deleteCustomer = (id) => {
      CustomerAPI.deleteCustomer(id).then(res => {
        if (res === 200) $modalInstance.close();
      }, err => console.error(err));
    }

  });
})();
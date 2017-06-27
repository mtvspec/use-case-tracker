(function () {
  'use strict';

  app.controller('CreateCustomerCtrl', function CreateCustomerCtrl($modalInstance, CustomerAPI) {

    let vm = this;

    vm.customer = {};

    vm.createCustomer = function (data) {
      CustomerAPI.createCustomer(data).then(res => {
        if (res === 201) $modalInstance.close()
      }, (err) => {
        console.error(err)
      })
    }

    vm.cancel = function () {
      $modalInstance.dismiss();
    }

  });

})();

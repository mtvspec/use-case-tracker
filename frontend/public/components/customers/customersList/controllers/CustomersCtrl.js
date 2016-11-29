(function () {
  'use strict';

  app.controller('CustomersCtrl', function (CustomerAPI) {

    var vm = this;

    CustomerAPI.getCustomers(function (customers) {
      console.log(customers);
      vm.customers = customers;
    });
  })
})();

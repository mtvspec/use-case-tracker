(function () {
  'use strict';

  app.controller('CustomersCtrl', function (CustomerAPI) {

    var vm = this;

    vm.customers = CustomerAPI.customers;
    
  })
})();

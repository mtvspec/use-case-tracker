(function () {
  'use strict';

  app.controller('CustomersCtrl', CustomersCtrl);

  function CustomersCtrl(CustomerAPI, $modal) {

    var vm = this;

    vm.customers = CustomerAPI.customers;

    vm.openCreateCustomerModal = () => {
      let modal = $modal.open({
        templateUrl: 'components/customers/CreateCustomer/views/template.html',
        controller: 'CreateCustomerCtrl as vm'
      });
    }

    vm.openUpdateCustomerModal = (customer) => {
      let modal = $modal.open({
        templateUrl: 'components/customers/UpdateCustomer/views/template.html',
        controller: 'UpdateCustomerCtrl as vm',
        resolve: {
          customer: () => {
            return customer
          }
        }
      });
      modal.result.then(res => {
        if (res && res.id) {
          Object.assign(customer, res);
        }
      });
    }

    vm.restoreCustomer = (id) => {
      CustomerAPI.restoreCustomer(id);
    }

  }

})();

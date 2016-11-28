(function () {
  'use strict';

  app.factory('CustomerAPI', function ($http) {
    let customers = [];

    return {
      getCustomers: function (cb) {
        if (customers.length === 0) {
          $http({
            url: '/api/customers',
            method: 'GET'
          }).then(function (response) {
            if (response && (response.status === 200 || response.status === 204)) {
              if (response && response.status === 200 || response.status === 204) {
                let len = response.data.length;
                for (let i = 0; i < len; i++) {
                  customers.push(response.data[i]);
                }
                return cb(customers);
              } else {
                return cb(customers);
              }
            }
          }, function (response) {
            console.error(response);
          })
        } else {
          return cb(customers);
        }
      }
    }
  });

})();

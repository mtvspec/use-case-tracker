(function () {
  'use strict';

  app.factory('CustomerAPI', function ($http) {
    
    let _customers = [];

    (function getCustomers () {
      $http.get('/api/customers').then((res) => {
        if (res.status === 200) {
          Object.assign(_customers, res.data);
          return _customers;
        }
      }, (err) => {
        console.error(err);
      });
    })();
    
    return {
      customers: _customers
    }
  
  });

})();

(function () {
  'use strict';

  app.factory('ComponentAPI', function ($http) {
    let components = [];

    return {
      getComponents: function (cb) {
        if (components.length === 0) {
          $http({
            url: '/api/components',
            method: 'GET'
          }).then(function (response) {
            if (response && response.status === 200) {
              let len = response.data.length;
              for (let i = 0; i < len; i++) {
                components.push(response.data[i]);
              }
              return cb(components);
            } else if (response.status === 204) {
              return cb(components);
            }
          }, function (response) {
            console.error(response);
          })
        } else {
          return cb(components);
        }
      }
    }
  });

})();

(function () {
  'use strict';

  app.factory('UseCaseSliceAPI', function ($http) {
    let slices = [];

    return {
      getUseCaseSlices: function (cb) {
        if (slices.length === 0) {
          $http({
            url: '/api/use-case-slices',
            method: 'GET'
          }).then(function (response) {
            if (response && response.status === 200) {
              let len = response.data.length;
              for (let i = 0; i < len; i++) {
                slices.push(response.data[i]);
              }
              return cb(slices);
            } else if (response.status === 204) {
              return cb(slices);
            }
          })
        } else {
          return cb(slices);
        }
      }
    }
  });

})();

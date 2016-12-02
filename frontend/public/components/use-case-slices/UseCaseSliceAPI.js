(function () {
  'use strict';

  app.factory('UseCaseSliceAPI', function ($http) {
    let slices = [],
    useCaseSliceStates = [];

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
      },
      getUseCaseSliceStates: function(cb) {
        if (useCaseSliceStates.length === 0) {
          $http({
            url: '/api/dict/use-case-slice-states',
            method: 'GET'
          }).then(function (response) {
            if (response && response.status === 200) {
              let len = response.data.length;
              for (let i = 0; i < len; i++) {
                useCaseSliceStates.push(response.data[i]);
              }
              return cb(useCaseSliceStates);
            } else if (response.status === 204) {
              return cb(useCaseSliceStates);
            }
          }, function (response) {
            console.error(response);
          })
        } else {
          return cb(useCaseSliceStates);
        }
      }
    }
  });

})();

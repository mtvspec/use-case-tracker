(function () {
  'use strict';

  app.factory('UseCaseAPI', function ($http) {
    let useCases = [];

    return {
      getUseCases: function (cb) {
        $http({
          url: '/api/use-cases',
          method: 'GET'
        }).then(function (response) {
          if (response && response.status === 200) {
            let len = response.data.length;
            for (let i = 0; i < len; i++) {
              useCases.push(response.data[i]);
            }
            return cb(useCases);
          } else if (response.status === 204) {
            return cb(useCases);
          }
        }, function (response) {
          console.error(response);
        })
      } else {
        return cb(useCases);
      }
    }

  });

})();

(function () {
  'use strict';

  app.factory('UseCaseSubjectAPI', function ($http, $state) {

    let useCaseSubjects = [];

    return {
      getUseCaseSubjects: function (cb) {
        if (useCaseSubjects.length === 0) {
          $http({
            url: '/api/use-case-subjects',
            method: 'GET'
          }).then(function (response) {
            if (response && response.status === 200) {
              let len = response.data.length;
              for (let i = 0; i < len; i++) {
                useCaseSubjects.push(response.data[i]);
              }
              return cb(useCaseSubjects);
            } else if (response.status === 204) {
              return cb(useCaseSubjects);
            }
          })
        } else {
          return cb(useCaseSubjects)
        }
      },
      createUseCaseSubject: function (useCaseSubject) {
        $http({
          url: '/api/use-case-subjects',
          method: 'POST',
          data: useCaseSubject
        }).then(function (response) {
          if (response && response.status === 201) {
            useCaseSubject.id = response.data.id;
            useCaseSubjects.push(useCaseSubjects);
            $state.go('tracker');
          } else {
            console.error(response);
          }
        }, function (response) {
          console.error(response);
        });
      }
    }

  });

})();

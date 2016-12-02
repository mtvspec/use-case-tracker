(function () {
  'use strict';

  app.controller('MainCtrl', function MainCtrl(
    $q,
    ProjectAPI
  ) {
    'ngInject';

    this.isLoaded = false;

    const promises = [];

    new Projects(function(resolve, reject) {
      ProjectAPI.getProjects(function (projects) {
        resolve(projects);
      });
    });

    promises.push(Projects);

    $q.all(promises).then(() => {
      this.isLoaded = true;
    });

  });

})();

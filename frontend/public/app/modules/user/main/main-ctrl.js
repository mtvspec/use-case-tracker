(function () {
  'use strict';

  app.controller('MainCtrl', MainCtrl);

  function MainCtrl(
    $q,
    PersonAPI,
    OrganizationAPI,
    OrganizationalUnitAPI,
    ProjectAPI,
    ProjectMemberAPI,
    CustomerAPI,
    IssueAPI) {
    'ngInject';

    this.isLoaded = false;

    const promises = [];

    let Projects = new Promise((resolve, reject) => {
      ProjectAPI.getProjects(projects => {
        console.log(projects);
        resolve(projects);
      });
    });

    promises.push(Projects);

    $q.all(promises).then(() => {
      console.log('loaded');
      this.isLoaded = true;
    });

  }

})();

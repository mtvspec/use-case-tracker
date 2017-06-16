(function () {
  'use strict';

  app.factory('ProjectAPI', function ($http) {
    let projects = [];
    let projectKinds = [];
    return {
      getProjects: function getProjects(cb) {
        if (projects.length === 0) {
          $http({
            url: '/api/projects',
            method: 'GET'
          }).then(function (response) {
            if (response && response.status === 200 || response.status === 204) {
              let len = response.data.length;
              for (let i = 0; i < len; i++) {
                projects.push(response.data[i]);
              }
              return cb(projects);
            } else {
              return cb(projects);
            }
          }, function (response) {
            console.error(response);
          })
        }
      },
      createProject: function(project) {
        $http({
          url: '/api/projects',
          method: 'POST',
          data: project
        }).then(function (response) {
          if (response.status === 201) {
            project.id = response.data.id;
            projects.push(project);
          }
        }, function (response) {
          console.error(response);
        });
      },
      getProjectKinds: function (cb) {
        if (projectKinds.length === 0) {
          $http({
            url: '/api/dict/project-kinds',
            method: 'GET'
          }).then(function (response) {
            if (response && response.status === 200 || response.status === 204) {
              console.log(response.data);
              let len = response.data.length;
              for (let i = 0; i < len; i++) {
                
                projectKinds.push(response.data[i]);
              }
              return projectKinds;
            } else {
              return projectKinds;
            }
          }, function (response) {
            console.error(response);
          })
        } else {
          return projectKinds;
        }
      },
      getProjectKindName: function(id, cb) {
        if (projectKinds && projectKinds.length > 0) {
          console.log(projectKinds);
          let len = projectKinds.length;
          for (let i = 0; i < len; i++) {
            if (projectKinds[i].id == id) {
              return cb(projectKinds[i].aProjectKindNameRU);
            }
          }
        } else {
          getProjectKinds();
        }
      }
    }

    getProjects();

    getProjectKinds();

  })

})();

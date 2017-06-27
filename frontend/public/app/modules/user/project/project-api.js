(function () {
  'use strict';

  app.factory('ProjectAPI', function ($http, socket) {
    
    let _projectKinds = [];
    let _projects = [];

////////////////////////////////////////////////////////////////////////////////

    socket.on('createdProjectID', (id) => {
      let isFound = false;
      for (let i in _projects) {
        if (_projects[i] === id) isFound = true;  
      }
      if (isFound === false) _getProjectByID(id);
    });

    socket.on('updatedProjectID', (id) => {
      $http.get(`api/projects/${id}`).then((res) => {
        let isFound = false;
        if (res.status === 200) {
          for (let i in _projects) {
            if (_projects[i].id === id) {
              isFound = true;
              _projects[i] = res.data;
            }
          }
          if (isFound === false) _projects.push(res.data);
        }
      }, (err) => {
        console.error(err);
      });
    });

    socket.on('deletedProjectID', (id) => {
      let isFound = false;
      for (let i in _projects) {
        if (_projects[i].id === id) {
          isFound = true;
          _projects[i].isDeleted = true;
          break;
        }
      }
      if (isFound === false) _getProjectByID(id);
    });
    
    socket.on('restoredProjectID', (id) => {
      let isFound = false;
      for (let i in _projects) {
        if (_projects[i].id === id) {
          isFound = true;
          _projects[i].isDeleted = false;
          console.log(_projects[i]);
          break;
        }
      }
      if (isFound === false) _getProjectByID(id);
    });

////////////////////////////////////////////////////////////////////////////////
    
    (function _getProjectKinds () {
      $http.get('/api/dict/project-kinds').then((res) => {
        if (res.status === 200) Object.assign(_projectKinds, res.data);
      }, (err) => {
        console.error(err);
      })
    })();
    
    (function _getProjects() {
      $http.get('/api/projects').then((res) => {
        if (res.status === 200) {
          Object.assign(_projects, res.data);
          return _projects;
        } else return _projects;
      }, (err) => {
        console.error(err);
      });
    })();
    
////////////////////////////////////////////////////////////////////////////////    
    
    return {
      projectKinds: _projectKinds,
      projects: _projects,
      createProject: (project) => {
        $http.post('/api/projects', project).then((res) => {
          if (res.status === 201) {
            const project = res.data;
            _projects.push(project);
          }
        }, (err) => {
          console.error(err);
        });
      },
      getProjectKindName: function(id, cb) {
        if (projectKinds && projectKinds.length > 0) {
          let len = projectKinds.length;
          for (let i = 0; i < len; i++) {
            if (projectKinds[i].id == id) {
              return cb(projectKinds[i].aProjectKindNameRU);
            }
          }
        } else {
          getProjectKinds();
        }
      },
      updateProject: (project, cb) => {
        $http.put(`/api/projects/${project.id}`, project).then((res) => {
          if (res.status === 200) {
            for (let i in _projects) {
              if (_projects[i].id === res.data.id) {
                _projects[i] = res.data;
              }
            }
          }
          return cb(res);
        }, (err) => {
          console.error(err);
          return cb(err);
        });
      }
    }

////////////////////////////////////////////////////////////////////////////////

    function _getProjectByID(id) {
      $http.get(`api/projects/${id}`).then((res) => {
        if (res.status === 200) _projects.push(res.data);
      }, (err) => {
        console.error(err);
      });
    }

  })

})();

(function () {
  'use strict';

  app.factory('OrganizationAPI', ($http, socket) => {
  
    let _organizations = [];

////////////////////////////////////////////////////////////////////////////////
  
    socket.on('createdOrganizationID', (id) => {
      _getOrganizationByID(id);
    });
    
    socket.on('updatedOrganizationID', (id) => {
      $http.get(`api/organizations/${id}`).then((res) => {
        let isFound = false;
        if (res.status === 200) {
          for (let i in _organizations) {
            if (_organizations[i].id === id) {
              isFound = true;
              _organizations[i] = res.data;
            }
          }
          if (isFound === false) _organizations.push(res.data);
        }
      }, (err) => {
        console.error(err);
      });
    });

    socket.on('deletedOrganizationID', (id) => {
      let isFound = false;
      for (let i in _organizations) {
        if (_organizations[i].id === id) {
          isFound = true;
          _organizations[i].isDeleted = true;
          break;
        }
      }
      if (isFound === false) _getOrganizationByID(id);
    });
    
    socket.on('restoredPersonID', (id) => {
      let isFound = false;
      for (let i in _organizations) {
        if (_organizations[i].id === id) {
          isFound = true;
          _organizations[i].isDeleted = false;
          break;
        }
      }
      if (isFound === false) _getOrganizationByID(id);
    });

////////////////////////////////////////////////////////////////////////////////
    
    (function _getOrganizations() {
      $http.get(`api/organizations/`).then((res) => {
        if (res.status === 200) {
          for (let i in res.data) {
            _organizations.push(res.data[i]);
          }
        }
      }, (err) => {
        console.error(err);
      })
    })();

////////////////////////////////////////////////////////////////////////////////

    return {
      organizations: _organizations,
      createOrganization: (organization) => {
        $http.post('/api/organizations', organization).then((res) => {
          if (res.status === 201) {
            organization.id = res.data.id;
            _organizations.push(organization);
            return _organizations;
          } else {
            console.error(res);
          }
        }, (err) => {
          console.error(err);
        });
      },
      updateOrganization: (organization, cb) => {
        $http.put(`/api/organizations/${organization.id}`, organization).then((res) => {
          if (res.status === 200) {
            for (let i in organizations) {
              if (_organizations[i].id === res.data.id) {
                _organizations[i] = res.data;
                break;
              }
            }
          }
          return cb(res);
        }, (err) => {
          console.error(err);
        });
      },
      deleteOrganization: (id) => {
        $http.delete(`/api/organizations/${id}`).then((res) => {
          if (res.status === 200) {
            for (let i in _organizations) {
              if (_organizations[i].id === res.data.id) {
                _organizations[i] = res.data;
                break;
              }
            }
          } else {
            console.error(res);
          }
        }, (err) => {
          console.error(err);
        });
      },
      restoreOrganization: (id) => {
        $http.options(`/api/organizations/${id}`).then((res) => {
          if (res.status === 200) {
            for (let i in organizations) {
              if (_organizations[i].id === res.data.id) {
                _organizations[i] = res.data;
                break;
              }
            }
          } else {
            console.error(res);
          }
        }, (err) => {
          console.error(err);
        });
      }
    }

////////////////////////////////////////////////////////////////////////////////

    function _getOrganizationByID(id) {
      $http.get(`api/organizations/${id}`).then((res) => {
        if (res.status === 200) _organizations.push(res.data);
      }, (err) => {
        console.error(err);
      });
    }

  });

})();

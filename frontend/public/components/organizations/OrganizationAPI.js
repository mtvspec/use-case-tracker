(function () {
  'use strict'

  app.service('OrganizationAPI', OrganizationAPI);

  function OrganizationAPI($http, socket) {

    let _organizations = [];

    this.organizations = _organizations;

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

    socket.on('restoredOrganizationID', (id) => {
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
          Object.assign(_organizations, res.data);
          return _organizations;
        }
      }, (err) => {
        console.error(err);
      });
    })();

    ////////////////////////////////////////////////////////////////////////////////

    this.getOrganizations = () => {
      return _organizations;
    }

    this.getOrganizationByID = (id) => {
      for (let i in _organizations) {
        if (_organizations[i].id === id) {
          return _organizations[i];
        }
      }
    }

    this.createOrganization = (data) => {
      return $http.post('/api/organizations/', data).then((res) => {
        return res.status;
      }, (err) => {
        console.error(err);
        return res.data;
      });
    }

    this.updateOrganization = (data) => {
      return $http.put(`/api/organizations/${data.id}`, data).then(res => {
        if (res.status === 200) {
          return res.status;
        }
      }, (err) => {
        console.error(err);
        return res.data;
      });
    }

    this.deleteOrganization = (id) => {
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
    }

    this.restoreOrganization = (id) => {
      $http.options(`/api/organizations/${id}`).then((res) => {
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
    }

    ////////////////////////////////////////////////////////////////////////////////

    function _getOrganizationByID(id) {
      $http.get(`api/organizations/${id}`).then((res) => {
        if (res.status === 200) _organizations.push(res.data);
      }, (err) => {
        console.error(err);
      });
    }

  }

})();

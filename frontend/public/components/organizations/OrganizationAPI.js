(function () {
  'use strict';

  app.factory('OrganizationAPI', function ($http, socket) {
  
    let organizations = [];
  
    socket.on('createdOrganizationID', (organizationID) => {
      _getOrganizationByID(organizationID);
    });
    
    socket.on('updatedOrganizationID', (organizationID) => {
      console.log(organizationID);
      $http({
        url: `api/organizations/${organizationID}`,
        method: 'GET'
      }).then((response) => {
        let updated = false;
        if (response.status === 200) {
          for (let i in organizations) {
            if (organizations[i].id === organizationID) {
              console.log(organizations[i]);
              updated = true;
              organizations[i] = response.data;
            }
          }
          if (updated === false) organizations.push(response.data);
        }
      }, (response) => {
        console.error(response);
      });
    });

    socket.on('deletedOrganizationID', (organizationID) => {
      let updated = false;
      for (let i in organizations) {
        if (organizations[i].id === organizationID) {
          updated = true;
          organizations[i].isDeleted = true;
          break;
        }
      }
      if (updated === false) _getOrganizationByID(organizationID);
    });
    
    socket.on('restoredPersonID', (organizationID) => {
      let updated = false;
      for (let i in organizations) {
        if (organizations[i].id === organizationID) {
          updated = true;
          organizations[i].isDeleted = false;
          break;
        }
      }
      if (updated === false) _getOrganizationByID(organizationID);
    });
    
    (function _getOrganizations() {
      $http({
        url: `api/organizations/`,
        method: 'GET'
      }).then((response) => {
        if (response.status === 200) {
          for (let i in response.data) {
            organizations.push(response.data[i]);
          }
        }
      }, (response) => {
        console.error(response);
      })
    })();
    
    function _getOrganizationByID(organizationID) {
      $http({
        url: `api/organizations/${organizationID}`,
        method: 'GET'
      }).then((response) => {
        if (response.status === 200) organizations.push(response.data);
      }, (response) => {
        console.error(response);
      })
    }

    return {
      organizations: organizations,
      getOrganizations: function (cb) {
        if (organizations.length === 0) {
          $http({
            url: '/api/organizations/',
            method: 'GET'
          }).then(function (response) {
            if (response && response.status === 200) {
              let len = response.data.length;
              for (let i = 0; i < len; i++) {
                organizations.push(response.data[i]);
              }
              return cb(organizations);
            } else {
              return cb(organizations);
            }
          })
        } else {
          return cb(organizations);
        }
      },
      createOrganization: function (organization) {
        $http({
          url: '/api/organizations',
          method: 'POST',
          data: organization
        }).then(function (response) {
          if (response && response.status === 201) {
            console.log(response.data);
            organization.id = response.data.id;
            organizations.push(organization);
            return organizations;
          } else {
            console.error(response);
          }
        }, function (response) {
          console.error(response);
        });
      },
      updateOrganization: function (organization, cb) {
        $http({
          url: `/api/organizations/${organization.id}`,
          method: 'PUT',
          data: organization
        }).then(function (response) {
          if (response.status === 200) {
            for (let i in organizations) {
              if (organizations[i].id === response.data.id) {
                organizations[i] = response.data;
                break;
              }
            }
          }
          return cb(response);
        }, function (response) {
          console.error(response);
          return cb(response);
        });
      },
      deleteOrganization: function (organizationID) {
        $http({
          url: `/api/organizations/${organizationID}`,
          method: 'DELETE'
        }).then(function (response) {
          if (response.status === 200) {
            for (let i in organizations) {
              if (organizations[i].id === response.data.id) {
                organizations[i] = response.data;
                break;
              }
            }
          } else {
            console.error(response);
          }
        }, function (response) {
          console.error(response);
        });
      },
      restoreOrganization: function (organizationID) {
        $http({
          url: `/api/organizations/${organizationID}`,
          method: 'OPTIONS'
        }).then(function (response) {
          if (response.status === 200) {
            for (let i in organizations) {
              if (organizations[i].id === response.data.id) {
                organizations[i] = response.data;
                break;
              }
            }
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

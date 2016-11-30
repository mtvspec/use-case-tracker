(function () {
  'use strict';

  app.factory('OrganizationAPI', function ($http) {
    let organizations = [];

    return {
      getOrganizations: function (cb) {
        if (organizations.length === 0) {
          $http({
            url: '/api/organizations',
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
      }
    }

  });

})();

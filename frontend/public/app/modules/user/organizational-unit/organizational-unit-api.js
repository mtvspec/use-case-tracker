(function () {
  'use strict';
  
  app.factory('OrganizationalUnitAPI', function (socket, $http) {
    
    let _organizationalUnits = [];
    
    socket.on('createdOrganizationalUnitID', (id) => {
      _getOrganizationalUnitByID(id);
    });
    
    (function _getOrganizationalUnits() {
      $http.get('/api/organizational-units').then((res) => {
        Object.assign(_organizationalUnits, res.data);
        return _organizationalUnits;
      }, (err) => {
        console.error(err);
      });
    })();
    
    return {
      organizationalUnits: _organizationalUnits
    }
    
    function _getOrganizationalUnitByID(id) {
      $http.get(`/api/organizational-units/${id}`).then((res) => {
        if (res.status === 200) _organizationalUnits.push(res.data);
      }, (err) => {
        console.error(err);
      });
    }
    
  });
  
})();
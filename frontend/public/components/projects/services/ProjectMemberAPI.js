(function () {
  'use strict';
  
  app.factory('ProjectMemberAPI', function ($http) {
    
    const url = '/api/project-members/';
    
    let _projectMembers = [];
    
    (function _getProjectMembers() {
      $http.get(url).then((res) => {
        if (res.status === 200) Object.assign(_projectMembers, res.data);
      }, (err) => {
        console.error(err);
      })
    })();
    
    return {
      projectMembers: _projectMembers
    }
    
  })
  
})();
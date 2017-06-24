(function () {
  'use strict';

  app.controller('MainCtrl', function MainCtrl($scope, $http, $state, PersonAPI, ProjectAPI, ProjectMemberAPI, OrganizationAPI, OrganizationalUnitAPI, CustomerAPI, IssueAPI) {
    
    $scope.logOut = () => {
      $http.post('/api/users/logout').then((res) => {
        if (res.status === 200) $state.go('login');
      }, (err) => {
        console.error(err);
      });
    }
    
  });

})();

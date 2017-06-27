(function () {
  'use strict';
  
  app.controller('ShowProjectInfoCtrl', function ShowProjectInfoCtrl(ProjectAPI, $modalInstance, project) {
    
    let vm = this;
    
    vm.project = angular.copy(project);
    
    vm.save = function () {
      ProjectAPI.updateProject(vm.project, function (response) {
        if (response.status === 200) {
          $modalInstance.close(vm.project);
        }
      });
    }
    
    vm.close = function () {
      $modalInstance.dismiss();
    }
    
  });
  
  
})();
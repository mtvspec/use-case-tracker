(function () {
  'use strict';
  
  
  app.controller('CreateProjectCtrl', function CreateProjectCtrl(ProjectAPI, $modalInstance) {
    
    let vm = this;
    
    vm.project = {};
    
    vm.createProject = function (project) {
      if (typeof project.aProjectName === 'string' && project.aProjectName.length >= 2 && project.aProjectName.length <= 1000) {
        ProjectAPI.createProject(project);
        $modalInstance.close();
      }
    }

    vm.cancel = function () {
      $modalInstance.dismiss();
    }
    
  })
  
})();
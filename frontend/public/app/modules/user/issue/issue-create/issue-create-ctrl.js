(function () {
  'use strict';
  
  app.controller('CreateIssueCtrl', function CreateIssueCtrl($modalInstance, IssueAPI) {
    
    let vm = this;

    vm.person = {};

    vm.issueTypes = IssueAPI.issueTypes;
    vm.issueStates = IssueAPI.issueStates;
    
    vm.createIssue = function (issue) {
      if (typeof issue.aIssueName === 'string' && issue.aIssueName.length >= 2 && issue.aIssueName.length <= 1000) {
        IssueAPI.createIssue(issue);
        $modalInstance.close();
      }
    }

    vm.cancel = function () {
      $modalInstance.dismiss();
    }
        
  });
  
  
})();
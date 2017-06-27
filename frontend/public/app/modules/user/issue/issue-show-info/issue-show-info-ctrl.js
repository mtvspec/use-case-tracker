(function () {
  'use strict';
  
  app.controller('ShowIssueInfoCtrl', function ShowIssueInfoCtrl(IssueAPI, $modalInstance, issue) {
    
    let vm = this;
    
    vm.issue = issue;
    
    vm.close = function () {
      $modalInstance.dismiss();
    }
    
  });  
  
})();
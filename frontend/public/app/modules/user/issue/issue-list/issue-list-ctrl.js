(function () {
  'use strict';
  
  app.controller('IssuesListCtrl', function IssuesListCtrl(IssueAPI, $modal, ProjectMemberAPI) {
    
    let vm = this;
    vm.issueTypes = IssueAPI.issueTypes;
    vm.issueStates = IssueAPI.issueStates;
    vm.issues = IssueAPI.issues;
    
    vm.projectMembers = ProjectMemberAPI.projectMembers;
    
    vm.getIssueTypeNameENByID = function (id) {
      for (let i in vm.issueTypes) {
        if (vm.issueTypes[i].id === id) return vm.issueTypes[i].aDictValueNameEN;
      }
    }
    
    vm.getIssueStateNameENByID = function (id) {
      console.log(id);
      for (let i in vm.issueStates) {
        if (vm.issueStates[i].id === id) return vm.issueStates[i].aDictValueNameEN;
      }
    }
    
    vm.openCreateIssueModal = function (issue) {
      let modal = $modal.open({
        templateUrl: 'components/issues/CreateIssue/views/createIssueModal.html',
        controller: 'CreateIssueCtrl as vm',
        backdrop: 'static',
        size: 'lg'
      });
    }
    
    vm.openShowIssueInfoModal = function (issue) {
      let modal = $modal.open({
        templateUrl: 'components/issues/ShowIssueInfo/views/showIssueInfoModal.html',
        controller: 'ShowIssueInfoCtrl as vm',
        resolve: {
          issue: function () {
            return issue;
          }
        },
        sise: 'lg'
      });
    }
    
  });
  
})();
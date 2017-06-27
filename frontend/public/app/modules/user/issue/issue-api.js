(function () {
  'use strict';
  
  app.factory('IssueAPI', function IssueAPI($http) {
    
    let _issueTypes = [];
    let _issueStates = [];
    let _issues = [];
    
    (function _getIssueTypes() {
      $http.get('/api/dict/issue-types').then((res) => {
        if (res.status === 200) Object.assign(_issueTypes, res.data);
      }, (err) => {
        console.error(err);
      });
    })();
    
    (function _getIssueStates() {
      $http.get('/api/dict/issue-states').then((res) => {
        if (res.status === 200) Object.assign(_issueStates, res.data);
      }, (err) => {
        console.error(err);
      });
    })();
    
    (function _getIssues() {
      $http.get('api/issues').then((res) => {
        if (res.status === 200) Object.assign(_issues, res.data);
      }, (err) => {
        console.error(err);
      });
    })();
    
    return {
      issues: _issues,
      issueTypes: _issueTypes,
      createIssue: (issue) => {
        $http.post('/api/issues', issue).then((res) => {
          const issue = res.data;
          if (res.status === 201) _issues.push(issue);
        }, (err) => {
          console.error(err);
        });
      }
    }
    
  });
  
})();
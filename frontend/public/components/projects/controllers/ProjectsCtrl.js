(function () {
  app.controller('ProjectsCtrl', function ProjectsCtrl($scope, $http) {

    var vm = this;

    vm.projects = [];

    vm.project = {};

    function getProjects() {
      $http({
        url: '/api/projects',
        method: 'GET'
      }).then(function success(response) {
        if (response.status === 200) {
          let len = response.data.length;
          for (let i = 0; i < len; i++) {
            vm.projects.push(response.data[i]);
          }
        }
      }, function failure(response) {
        console.error(response);
      });
    }

    vm.createProject = function(project) {
      $http({
        url: '/api/projects',
        method: 'POST',
        data: project
      }).then(function (response) {
        if (response.status === 201) {
          project.id = response.data.id;
          console.log(project);
          vm.projects.push(project);
          console.log(vm.projects);
        }
        console.log(response);
      }, function (response) {
        console.error(response);
      });
    }

    getProjects();

    console.log('ProjectsCtrl');
  });
})();

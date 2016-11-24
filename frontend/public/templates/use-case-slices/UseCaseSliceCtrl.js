(function UseCaseSliceCtrl() {
  'use strict';

  app.controller('UseCaseSliceCtrl', function UseCaseSliceCtrl($scope, $http) {

    var vm = this;

    vm.useCaseSlices = [];

    $http({
      url: '/api/use-case-slices',
      method: 'GET'
    }).then(function success(response) {
      if (response.status === 200) {
        let len = response.data.length;
        for (let i = 0; i < len; i++) {
          vm.useCaseSlices.push(response.data[i]);
        }
        console.log(vm.useCaseSlices);
      } else {
        console.log(response);
      }
    }, function failure(response) {
      console.error(response);
    });

    vm.textAreaAdjust = function(o) {
      console.log(o);
      o.style.height = "1px";
      o.style.height = (25+o.scrollHeight)+"px";
    }

    vm.showUseCaseSliceContent = function(id) {
      console.log(id);
      let len = vm.useCaseSlices.length;
      for (let i = 0; i < len; i++) {
        if (vm.useCaseSlices[i].id === id) {
          return vm.useCaseSlice = vm.useCaseSlices[i];
        }
      }
    }

  });

})();

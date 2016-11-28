(function () {
  'use strict';

  app.controller('UseCaseSubjectListCtrl', function UseCaseSubjectListCtrl($http) {
    var vm = this;

    vm.subjects = [];

    vm.useCases = [];

    vm.slices = [];

    vm.defects = [];

    vm.sliceStates = [];

    vm.defectStates = [];

    vm.getUseCaseSliceStateBySliceID = function (id) {
      let len = vm.sliceStates.length;
      for (let i = 0; i < len; i++) {
        if (vm.sliceStates[i].id == id) {
          return vm.sliceStates[i].aUseCaseSliceStateNameRU;
        }
      }
    }

    vm.getDefectStateByDefectID = function (id) {
      let len = vm.defectStates.length;
      for (let i = 0; i < len; i++) {
        if (vm.defectStates[i].id == id) {
          return vm.defectStates[i].aDefectStateNameRU;
        }
      }
    }

    vm.getUseCaseSliceStates = function () {
      $http({
        url: '/api/dict/use-case-slice-states',
        method: 'GET'
      }).then(function (response) {
        if (response && response.status === 200) {
          let len = response.data.length;
          for (let i = 0; i < len; i++) {
            vm.sliceStates.push(response.data[i]);
          }
          return vm.sliceStates;
        } else if (response.status === 204) {
          return vm.sliceStates;
        }
      }, function (response) {
        console.error(response);
      })
    }

    vm.getUseCaseSliceStates();

    vm.getDefectStates = function () {
      $http({
        url: '/api/dict/defect-states',
        method: 'GET'
      }).then(function (response) {
        if (response && response.status === 200) {
          let len = response.data.length;
          for (let i = 0; i < len; i++) {
            vm.defectStates.push(response.data[i]);
          }
          console.log(vm.defectStates);
          return vm.defectStates;
        } else if (response.status === 204) {
          return vm.defectStates;
        }
      }, function (response) {
        console.error(response);
      })
    }

    vm.getDefectStates();

    vm.getSubjects = function () {
      $http({
        url: '/api/use-case-subjects',
        method: 'GET'
      }).then(function (response) {
        if (response && response.status === 200) {
          let len = response.data.length;
          for (let i = 0; i < len; i++) {
            vm.subjects.push(response.data[i]);
          }
          return vm.subjects;
        } else if (response.status === 204) {
          return vm.subjects;
        }
      }, function (response) {
        console.error(response);
      })
    }

    vm.getSubjects();

    vm.getUseCases = function () {
      $http({
        url: '/api/use-cases',
        method: 'GET'
      }).then(function (response) {
        if (response && response.status === 200) {
          let len = response.data.length;
          for (let i = 0; i < len; i++) {
            vm.useCases.push(response.data[i]);
          }
          return vm.useCases;
        } else if (response.status === 204) {
          return vm.useCases;
        }
      }, function (response) {
        console.error(response);
      })
    }

    vm.getUseCases();

    vm.getSlices = function () {
      $http({
        url: '/api/use-case-slices',
        method: 'GET'
      }).then(function (response) {
        if (response && response.status === 200) {
          let len = response.data.length;
          for (let i = 0; i < len; i++) {
            vm.slices.push(response.data[i]);
          }
          return vm.slices;
        } else if (response.status === 204) {
          return vm.slices;
        }
      })
    }

    vm.getSlices();

    vm.getUseCasesByUseCaseSubject = function(id) {
      return function (useCase) {
        return useCase.eUseCaseSubjectID == id;
      }
    }

    vm.getDefectsBySliceID = function (id) {
      return function (defect) {
        return defect.eUseCaseSliceID == id;
      }
    }

    vm.getDefects = function () {
      $http({
        url: '/api/defects',
        method: 'GET'
      }).then(function (response) {
        if (response && response.status === 200) {
          let len = response.data.length;
          for (let i = 0; i < len; i++) {
            vm.defects.push(response.data[i]);
          }
          return vm.defects;
        } else {
          return vm.defects;
        }
      }, function (response) {
        console.error(response);
      })
    }

    vm.getDefects();

    vm.getSlicesByUseCaseID = function (id) {
      return function (slice) {
        return slice.eUseCaseID == id;
      }
    }

  })
})();

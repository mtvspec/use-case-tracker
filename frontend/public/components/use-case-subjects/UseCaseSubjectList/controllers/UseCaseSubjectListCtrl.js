(function () {
  'use strict';

  app.controller('UseCaseSubjectListCtrl', function UseCaseSubjectListCtrl(
    $http,
    UseCaseSubjectAPI,
    UseCaseAPI,
    UseCaseSliceAPI,
    DefectReportAPI) {

    var vm = this;

    vm.subjects = [];

    vm.useCases = [];

    vm.slices = [];

    vm.defectReports = [];

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

    vm.getUseCasesCount = function(id) {
      for (let i = 0; i < len; i++) {
        if (vm.useCases[i].eUseCaseSubjectID == id) {
          count = count + 1;
        }
      }
      return count;
    }

    vm.getUseCaseSlicesCount = function(id) {
      let len = vm.slices.length;
      let count = 0;
      for (let i = 0; i < len; i++) {
        if (vm.slices[i].eUseCaseID == id) {
          count = count + 1;
        }
      }
      return count;
    }

    vm.getDefectReportsCount = function (id) {
      let len = vm.defectReports.length;
      let count = 0;
      for (let i = 0; i < len; i++) {
        if (vm.defectReports[i].eUseCaseSliceID == id) {
          count = count + 1;
        }
      }
      return count;
    }

    vm.getDefectStates();

    UseCaseSubjectAPI.getUseCaseSubjects(function (subjects) {
      vm.subjects = subjects;
    });

    UseCaseAPI.getUseCases() {

    }

    vm.getSlices = function () {

    }

    UseCaseSliceAPI.getUseCaseSlices(function (slices) {
      vm.slices = slices;
    });

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

    DefectReportAPI.getDefectReports(function (defectReports) {
      vm.defectReports = defectReports;
    });

    vm.getSlicesByUseCaseID = function (id) {
      return function (slice) {
        return slice.eUseCaseID == id;
      }
    }

  })
})();

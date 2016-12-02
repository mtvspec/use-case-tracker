(function () {
  'use strict';

  app.controller('UseCaseSubjectListCtrl', function UseCaseSubjectListCtrl(
    $state,
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

    vm.createUseCaseSubject = function () {
      $state.go('createUseCaseSubject');
    }

    vm.getUseCaseSliceStateBySliceID = function (id) {
      let len = vm.sliceStates.length;
      for (let i = 0; i < len; i++) {
        if (vm.sliceStates[i].id == id) {
          return vm.sliceStates[i].aUseCaseSliceStateNameRU;
        }
      }
    }

    UseCaseSliceAPI.getUseCaseSliceStates(function (useCaseSliceStates) {
      return vm.useCaseSliceStates = useCaseSliceStates;
    })

    DefectReportAPI.getDefectStates(function (defectStates) {
      return vm.defectStates = defectStates;
    })

    vm.getUseCasesCount = function(id) {
      let len = vm.useCases.length;
      let count = 0;
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

    UseCaseSubjectAPI.getUseCaseSubjects(function (subjects) {
      return vm.subjects = subjects;
    })

    UseCaseAPI.getUseCases(function (useCases) {
      return vm.useCases = useCases;
    })

    UseCaseSliceAPI.getUseCaseSlices(function (slices) {
      return vm.slices = slices;
    })

    vm.getUseCasesByUseCaseSubject = function(id) {
      return function (useCase) {
        return useCase.eUseCaseSubjectID == id;
      }
    }

    vm.getDefectReportsByUseCaseSliceID = function (id) {
      return function (defectReport) {
        return defectReport.eUseCaseSliceID == id;
      }
    }

    DefectReportAPI.getDefectReports(function (defectReports) {
      return vm.defectReports = defectReports;
    })

    vm.getSlicesByUseCaseID = function (id) {
      return function (slice) {
        return slice.eUseCaseID == id;
      }
    }

    vm.getDefectReportsByUseCaseSliceID = function(id) {
      return function(defectReport) {
        return defectReport.eUseCaseSliceID == id;
      }
    }

    vm.getDefectReportsCount = function(id) {
      let len = vm.defectReports.length;
      let count = 0;
      for (let i = 0; i < len; i++) {
        if (vm.defectReports[i].eUseCaseSliceID == id) {
          count = count + 1;
        }
      }
      return count;
    }

    vm.getDefectReportStateNameRUByDefectReportID = function(id) {
      let len = vm.defectStates.length;
      for (let i = 0; i < len; i++) {
        if (vm.defectStates[i].id == id) {
          return vm.defectStates[i].aDefectStateNameRU;
        }
      }
    }

  })

})();

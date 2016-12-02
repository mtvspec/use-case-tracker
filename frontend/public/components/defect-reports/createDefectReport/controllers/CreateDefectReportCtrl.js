(function () {
  'use strict';

  app.controller('CreateDefectReportCtrl', function CreateDefectReportCtrl(DefectReportAPI) {

    let vm = this;

    vm.defectReport = {};

    vm.createDefectReport = function(defectReport) {
      DefectReportAPI.createDefectReport(defect);
    }

  })
  
})();

(function () {
  'use strict';

  app.factory('DefectReportAPI', function ($http) {

    let defectReports = [],
    defectStates = [];

    return {
      getDefectReports: function(cb) {
        if (defectReports.length === 0) {
          $http({
            url: '/api/defects',
            method: 'GET'
          }).then(function (response) {
            if (response && response.status === 200) {
              let len = response.data.length;
              for (let i = 0; i < len; i++) {
                defectReports.push(response.data[i]);
              }
              return cb(defectReports);
            } else {
              return cb(defectReports);
            }
          }, function (response) {
            console.error(response);
          });
        } else {
          return cb(defectReports);
        }
      },
      getDefectReportStateNameRUByDefectReportID: function (id) {
        let len = defectStates.length;
        for (let i = 0; i < len; i++) {
          if (defectStates[i].id == id) {
            return defectStates[i].aDefectStateNameRU;
          }
        }
      }
    }
  })
})();

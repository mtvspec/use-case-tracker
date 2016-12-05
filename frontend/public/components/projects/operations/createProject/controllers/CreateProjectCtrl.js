(function () {
  'use strict';

  app.controller('CreateProjectCtrl', function CreateProjectCtrl($mdDialog) {

    let vm = this;


    vm.showDialog = function(ev) {
      $mdDialog.show({
        templateUrl: 'components/projects/createProject/views/template.html',
        controller: CreateProjectCtrl,
        targetEvent: ev
      });
    }

    vm.closeDialog = function () {
      $mdDialog.hide();
    }

  });
})();

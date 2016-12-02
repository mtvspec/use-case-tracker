(function () {
  'use strict';

  app.controller('CreateUseCaseSubjectCtrl', function CreateUseCaseSubjectCtrl(ComponentAPI, UseCaseSubjectAPI) {
    let vm = this;

    vm.useCaseSubject = {};

    ComponentAPI.getComponents(function (components) {
      vm.components = components;
    });

    vm.createUseCaseSubject = function(useCaseSubject) {
      UseCaseSubjectAPI.createUseCaseSubject(useCaseSubject);
    }

  });

})();

(function () {
  'use strict';

  app.controller('CreateUseCaseSliceCtrl', function CreateUseCaseSliceCtrl(UseCaseAPI, UseCaseSliceAPI) {
    let vm = this;

    vm.useCaseSlice = {};

    vm.getUseCases = function() {
      UseCaseAPI.getUseCases(function (useCases) {
        return vm.useCases = useCases;
      })
    }

    vm.createUseCaseSlice = function(useCaseSlice) {
      UseCaseSliceAPI.createUseCaseSlice(useCaseSlice);
    }

  });

})();

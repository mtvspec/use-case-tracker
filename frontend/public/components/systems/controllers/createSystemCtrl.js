(function () {
  'use strict';

  app.controller('CreateSystemCtrl', function CreateSystemCtrl($scope, $http) {
    var vm = this;

    vm.system = {}

    vm.systemKinds = [
      {
        id: 1,
        aSystemKindName: 'Information system 1'
      },
      {
        id: 2,
        aSystemKindName: 'System'
      }
    ];

    vm.systemTypes = [
      {
        id: 1,
        aSystemTypeName: 'Type 1'
      },
      {
        id: 2,
        aSystemTypeName: 'Type 2'
      }
    ]

    vm.createSystem = function(system) {
      $http({
        url: '/api/systems',
        method: 'POST',
        data: system
      }).then(function (response) {
        console.log(response);
      }, function (response) {
        console.error(response);
      });
    }
  });

})();

"use strict";

/**
 * Subexample module controllers.
 */
angular.module('app.subexampleModule')
  .controller(
    'SubexampleController',
    [
      '$log',
      '$scope',
      'titleService',
      'subexampleData',
      
      function(
        $log,
        $scope,
        titleService,
        subexampleData
      ) {
        
        titleService.setTitle('Example - subexample - ');
      }
    ]
  )
;
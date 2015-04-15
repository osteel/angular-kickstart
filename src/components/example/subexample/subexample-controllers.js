"use strict";

/**
 * Subexample module controllers.
 */
angular.module('app.subexampleModule')
  .controller(
    'SubexampleController',
    [
      '$log',
      'titleService',
      'subexampleData',
      
      function(
        $log,
        titleService,
        subexampleData
      ) {
        var vm = this;
        
        titleService.setTitle('Example - subexample - ');
        
        vm.aString2 = "Hello Universe!";
      }
    ]
  )
;
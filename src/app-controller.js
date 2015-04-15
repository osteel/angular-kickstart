"use strict";

angular.module("app")
    .controller(
        "AppController",
        [
            "$log",
            "EXAMPLE",

            function(
                $log,
                EXAMPLE
            ) {
                var vm = this;
        
                $log.log("Main controller loaded.");

                vm.aString = "Hello World!";
                vm.aConstant = EXAMPLE;
            }
        ]
    )
;

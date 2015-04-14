"use strict";

angular.module("app")
    .controller(
        "AppController",
        [
            "$log",
            "$scope",
            "EXAMPLE",

            function(
                $log,
                $scope,
                EXAMPLE
            ) {
                $log.log("Main controller loaded.");

                $scope.aString = "Hello World!";
                $scope.aConstant = EXAMPLE;
            }
        ]
    )
;

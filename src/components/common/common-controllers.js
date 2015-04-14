"use strict";

/**
 * Common controllers, used by a component employed across the application,
 * for example.
 */
angular.module("app.controllers", [])
    /**
     * Example
     */
    .controller(
        "CommonController",
        [
            "$log",
            "$scope",

            function(
                $log,
                $scope
            ) {
                $log.log("Common controller loaded.");
            }
        ]
    )
;
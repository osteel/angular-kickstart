"use strict";

/**
 * Directives used throughout the application.
 */
angular.module("app.directives", [])
    /**
     * Example
     */
    .directive(
        "commonDirective",
        [
            "$log",

            function(
                $log
            ) {
                return {
                    restrict: "A", // attribute
                    scope: {},
                    link: function($scope, element, attrs) {
                        $log.log("Common directive loaded.");
                    }
                };
            }
        ]
    )
;
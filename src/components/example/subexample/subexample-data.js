"use strict";

/**
 * Subexample module data layer.
 */
angular.module("app.subexampleModule")

    .service(
        "subexampleData",
        [
            "$log",
            "$q",
            "myRestangular",

            function(
                $log,
                $q,
                myRestangular
            ) {

            }
        ]
    )
;
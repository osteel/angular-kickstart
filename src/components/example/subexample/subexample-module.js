"use strict";

/**
 * Example submodule.
 */
angular.module("app.subexampleModule", ["ui.router"])
    .config(["$stateProvider", function($stateProvider) {
        // state config
        $stateProvider
            .state("example-subexample", {
                url: "/example/subexample",
                templateUrl: "partials/example/subexample/subexample.html",
                controller: "SubexampleController"
            })
        ;
  }])
;
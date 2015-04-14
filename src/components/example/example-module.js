"use strict";

/**
 * Example module. This is where routes are declared, and dependencies are
 * resolved.
 */
angular.module("app.exampleModule", ["ui.router"])
    .config(["$stateProvider", function($stateProvider) {
        // state config
        $stateProvider
            .state("example", {
                url: "/example",
                templateUrl: "partials/example/example.html",
                controller: "ExampleController",
                resolve: {
                    items: ["exampleData", function(exampleData) {
                        return exampleData.getList();
                    }],
                    item: ["exampleData", "items", function(exampleData, items) {
                        return exampleData.getOne(items[0].id);
                    }]
                }
            })
        ;
    }])
;
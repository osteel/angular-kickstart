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
                templateUrl: "components/example/partials/example.html",
                controller: "ExampleController",
                controllerAs: "example",
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
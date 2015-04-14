"use strict";

/**
 * Example module controllers.
 */
angular.module("app.exampleModule")
    .controller(
        "ExampleController",
        [
            "$log",
            "$scope",
            "$window",
            "titleService",
            "exampleData",
            "items",
            "item",

            function(
                $log,
                $scope,
                $window,
                titleService,
                exampleData,
                items,
                item
            ) {
                titleService.setTitle("Example - ");
                
                // assign the list of items to the scope
                $scope.items = items;

                // assign the item to the scope
                $scope.item = item;

                // load another item
                $scope.loadItem = function(id) {
                    exampleData.getOne(id).then(
                        function(data) {
                            $window.alert("The Apiary mockup always returns the 'Fiorentina' item, but the request was for the item #" + id + ".");
                            $scope.item = data;
                        }
                    );
                };
            }
        ]
    )
;
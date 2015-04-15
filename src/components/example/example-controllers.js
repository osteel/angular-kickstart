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
                var vm = this;
        
                titleService.setTitle("Example - ");
                
                vm.items = items;
                vm.item = item;
                vm.loadItem = loadItem;
                
                function loadItem(id) {
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
"use strict";

/**
 * The data layer is a service where API calls are made, per module.
 */
angular.module("app.exampleModule")

    .service(
        "exampleData",
        [
            "$log",
            "$q",
            "myRestangular",

            function(
                $log,
                $q,
                myRestangular
            ) {

                /**
                 * Returns a list of example items
                 * 
                 * @param array params
                 * @returns promise
                 */
                this.getList = function(params) {
                    var deferred  = $q.defer();
                    myRestangular.all("items").getList(params).then(
                        function(data) {
                            deferred.resolve(angular.copy(data));
                        }
                    );

                    return deferred.promise;
                };

                /**
                 * Returns one of the example items by id
                 * 
                 * @param int id
                 * @returns promise
                 */
                this.getOne = function(id) {
                    id = parseInt(id);
                    if (typeof id <= 0) { throw "Invalid id"; }

                    var deferred  = $q.defer();

                    myRestangular.one("items", id).get().then(
                        function(data) {
                            deferred.resolve(angular.copy(data));
                        }
                    );

                    return deferred.promise;
                };


                /**
                 * @param object model
                 * @returns promise
                 */
                this.saveOne = function(model) {
                    var deferred = $q.defer();

                    if (typeof model.id === "number") {
                        myRestangular.one("items", model.id).customPUT(model).then(
                            function(data) {
                                deferred.resolve(angular.copy(data));
                            }
                        );
                    } else {
                        myRestangular.all("items").post(model).then(
                            function(data) {
                                deferred.resolve(angular.copy(data));
                            }
                        );
                    }

                    return deferred.promise;
                };

                /**
                 * @param int id
                 * @returns promise
                 */
                this.deleteOne = function(id) {
                    id = parseInt(id);
                    if (typeof id <= 0) { throw "Invalid id"; }

                    var deferred = $q.defer();

                    myRestangular.one("items", id).remove().then(
                        function(data) {
                            deferred.resolve(angular.copy(data));
                        }
                    );

                    return deferred.promise;
                };
            }
        ]
    )
;
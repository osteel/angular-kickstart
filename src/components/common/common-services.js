"use strict";

/**
 * Services used throughout the application.
 */
angular.module("app.services", [])
    /**
     * Service to set the title of the document
     */
    .factory("titleService", function($document) {
        return {
            suffix: "",
            setTitle: function(t) {
                $document.prop("title", t + this.suffix);
            },
            getTitle: function() { $document.prop("title"); }
        };
    })


    /**
     * Service to build a query from a "params" object
     */
    .service("queryBuilder", ["$log", function($log) {
        this.serialize = function(params) {
            var str = [];
            for (var p in params) {
                if (params.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
                }
            }

            return str.length > 0 ? "?" + str.join("&") : "";
        };
    }])


    /**
     * Intercept error responses
     */
    .factory(
        "errorHttpInterceptor",
        [
            "$log",
            "$q",
            "$rootScope",
            "EVENTS",

            function (
                $log,
                $q,
                $rootScope,
                EVENTS
            ) {
                return {
                   "responseError": function(response) {
                        
                        if (response.status >= 400 && response.status < 500) {
                            var message, data = { "code": response.status };

                            switch (response.status) {
                                case 400:
                                case 403:
                                    message = true;
                                    break;

                                case 404:
                                    message = "Sorry, we couldn't find the requested page";
                                    break;
                            }

                            message = message || response.data.error || response.data.errors;

                            if (typeof message === "object") {
                                message = _.find(message).join("\n");
                            }

                            if (message !== true) {
                                message = message || "An error occurred, please try again later";
                                // do something with the message
                            }

                            $log.log("Error calling " + response.config.url);
                            $rootScope.$broadcast(EVENTS.ERROR_INTERCEPTED, data);
                        }
                        
                        return $q.reject(response);
                    }
                };
            }
        ]
    )
    
    
    /**
     * Broadcast REQUEST_STARTED and REQUEST_ENDED events on all ajax requests.
     * 
     * Usefull to indicate to the user something is happening, for example.
     */
    .factory(
        "globalHttpInterceptor",
        [
            "$log",
            "$q",
            "$injector",
            "EVENTS",

            function (
                $log,
                $q,
                $injector,
                EVENTS
            ) {
                return {
                    "request": function(config) {
                        // get $rootScope via $injector because of circular dependency problem
                        var $rootScope = $rootScope || $injector.get("$rootScope");
                            
                        // send notification a request has started
                        $rootScope.$broadcast(EVENTS.REQUEST_STARTED);
                        
                        return config;
                    },

                    "requestError": function(request) {
                        // get $rootScope via $injector because of circular dependency problem
                        var $rootScope = $rootScope || $injector.get("$rootScope");
                        
                        // send notification a request has started
                        $rootScope.$broadcast(EVENTS.REQUEST_STARTED);
                        
                        return $q.reject(request);
                    },
                    
                    "response": function(response) {
                        // get $http via $injector because of circular dependency problem
                        var $http = $http || $injector.get("$http");
                        
                        if ($http.pendingRequests.length < 1) {
                            // get $rootScope via $injector because of circular dependency problem
                            var $rootScope = $rootScope || $injector.get("$rootScope");
                                
                            // send a notification requests are complete
                            $rootScope.$broadcast(EVENTS.REQUEST_ENDED);
                        }
                        
                        return response;
                    },
                    
                   "responseError": function(response) {
                       // get $http via $injector because of circular dependency problem
                        var $http = $http || $injector.get("$http");
                        
                        if ($http.pendingRequests.length < 1) {
                            // get $rootScope via $injector because of circular dependency problem
                            var $rootScope = $rootScope || $injector.get("$rootScope");
                            
                            // send a notification requests are complete
                            $rootScope.$broadcast(EVENTS.REQUEST_ENDED);
                        }
                        
                        return $q.reject(response);
                    }
                };
            }
        ]
    )


    /**
     * Custom Restangular service (with config)
     */
    .factory(
        "myRestangular",
        [
            "$log",
            "Restangular",
            "API_BASE_URL",

            function(
              $log,
              Restangular,
              API_BASE_URL
            ) {
                return Restangular.withConfig(function(RestangularConfigurer) {
                    RestangularConfigurer.setBaseUrl(API_BASE_URL);
                    RestangularConfigurer.setDefaultHttpFields({
                        "withCredentials": true
                    });
                    RestangularConfigurer.addResponseInterceptor(function(data, operation) {
                        if (data && typeof data.data !== "undefined") {
                            return data.data;
                        }
                        return data;
                    });
                });
            }
        ]
    )
;
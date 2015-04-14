"use strict";

/** 
 * The main app
 */
var app = angular.module("app", [
    "restangular",
    "ui.router",
    "ngProgressLite",

    "app.config",
    "app.constants",
    "app.controllers",
    "app.directives",
    "app.filters",
    "app.services",

    "app.exampleModule",
    "app.subexampleModule"
])

    .config(
        [
            "$provide",
            "$urlRouterProvider",
            "$stateProvider",
            "$httpProvider",
            "$locationProvider",
            "RestangularProvider",
            "API_BASE_URL",
            "EVENTS",

            function(
                $provide,
                $urlRouterProvider,
                $stateProvider,
                $httpProvider,
                $locationProvider,
                RestangularProvider,
                API_BASE_URL,
                EVENTS
            ) {
                // state config
                $urlRouterProvider.otherwise("/example");

                // use the HTML5 History API
                $locationProvider.html5Mode(true);

                // global Restangular object config
                RestangularProvider.setBaseUrl(API_BASE_URL);

                // add HTTP interceptors
                $httpProvider.interceptors.push("globalHttpInterceptor");
                $httpProvider.interceptors.push("errorHttpInterceptor");

                // add a "reload" function to the $state service
                $provide.decorator("$state", function($delegate, $stateParams) {
                    $delegate.reload = function() {
                        return $delegate.go($delegate.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    };
                    return $delegate;
                });
            }
        ]
    )


    /**
     * Stuff to get the app running.
     *
     * Ensure we have a page title.
     */
    .run(
        [
            "$state",
            "$stateParams",
            "$rootScope",
            "$timeout",
            "titleService",
            "SITENAME",
            "EVENTS",
            "ngProgressLite",

            function(
                $state,
                $stateParams,
                $rootScope,
                $timeout,
                titleService,
                SITENAME,
                EVENTS,
                ngProgressLite
            ) {
                titleService.suffix = SITENAME;

                $rootScope.$on(EVENTS.ERROR_INTERCEPTED, function(event, data) {
                    if (data) {
                        switch (data.code) {
                            case 404:
                                $state.transitionTo("example");
                                break;
                        }
                    }
                });

                $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
                    // loading bar
                    ngProgressLite.start();
                });

                $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
                    // loading bar
                    ngProgressLite.set(0.7);
                    $timeout(function () {
                        ngProgressLite.done();
                    }, 500);
                });

                $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
                    // loading bar
                    ngProgressLite.done();
                });
            }
        ]
    )
;

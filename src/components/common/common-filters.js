"use strict";

/**
 * Filters used throughout the application.
 */
angular.module("app.filters", [])
    /**
     * Example
     */
    .filter("commonFilter", [function () {
        return function(aParam) {
            return "**" + aParam + "**";
        };
    }])
;
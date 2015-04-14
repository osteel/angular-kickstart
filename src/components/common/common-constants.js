"use strict";

/**
 * Common constants.
 *
 * These should be UPPERCASE to make things clear.
 */
angular.module("app.constants", [])
    .constant("EVENTS", {
        "REQUEST_STARTED": "request_started",
        "REQUEST_ENDED": "request_ended",
        "ERROR_INTERCEPTED": "error_intercepted"
    })
  
    .constant("EXAMPLE", "Example constant")
;
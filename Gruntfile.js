var modRewrite = require("connect-modrewrite");

module.exports = function(grunt) {
    
    // load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        connect: {
            options: {
                port: 8888,
                middleware: function(connect, options) {
                    var middlewares = [];
                    middlewares.push(
                        modRewrite(["^[^\\.]*$ /index.html [L]"]) // matches everything that does not contain a "." (period)
                    );
                    options.base.forEach(function(base) {
                        middlewares.push(connect.static(base));
                    });

                    return middlewares;
                }
            },
            dev: {
                options: {
                    base: "src",
                    livereload: true
                }
            },
            staging: {
                options: {
//                    protocol: "https",
                    base: "dist",
                    keepalive: true
                }
            }
        },

        template: {
            dev: {
                options: {
                    data: function() {
                        var config = require("./src/config/development.json");
                        return config;
                    }
                },
                files: {
                    "src/config.js": ["src/config/config.js.tpl"]
                }
            },
            staging: {
                options: {
                    data: function() {
                        var config = require("./src/config/staging.json");
                        return config;
                    }
                },
                files: {
                    "src/config.js": ["src/config/config.js.tpl"]
                }
            },
            prod: {
                options: {
                    data: function() {
                        var config = require("./src/config/production.json");
                        return config;
                    }
                },
                files: {
                    "src/config.js": ["src/config/config.js.tpl"]
                }
            }
        },

        cssnext: {
            options: {
                sourcemap: true
            },
            dist: {
                files: {
                    "src/assets/css/app.css": "src/css/app.css"
                }
            }
        },

        clean: {
            before: ["dist"],
            after: [".tmp"]
        },

        copy: {
            prod: {
                expand: true,
                cwd: "src/",
                src: ["index.html", "assets/img/**", "components/**/*.html", "!vendor/**", "!js/**", "!styl/**", "!config/**"],
                dest: "dist/"
            }
        },

        rev: {
            files: {
                src: ["dist/assets/css/app.min.css", "dist/components/app.min.js"]
            }
        },

        useminPrepare: {
            html: "src/index.html"
        },

        usemin: {
            html: "dist/index.html"
        },

        uglify: {
            options: {
                report: "min",
                mangle: false,
                beautify: {
                    ascii_only: true
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            css: {
                files: ["src/css/**/*.css"],
                tasks: ["cssnext"],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ["src/components/**/*.js"],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ["src/index.html", "src/components/**/*.html"],
                options: {
                    livereload: true
                }
            },
            template: {
                files: ["src/config/development.json", "src/config/config.js.tpl"],
                tasks: ["template:dev"],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.registerTask(
        "dev",
        [
            "cssnext",
            "template:dev",
            "connect:dev",
            "watch"
        ]
    );

    grunt.registerTask(
        "staging",
        [
            "clean:before",
            "cssnext",
            "template:staging",
            "copy",
            "useminPrepare",
            "concat",
            "uglify",
            "cssmin",
            "rev",
            "usemin",
            "clean:after"
//            ,"connect:staging"
        ]
    );

    grunt.registerTask(
        "prod",
        [
            "clean:before",
            "cssnext",
            "template:prod",
            "copy",
            "useminPrepare",
            "concat",
            "uglify",
            "cssmin",
            "rev",
            "usemin",
            "clean:after"
        ]
    );
};
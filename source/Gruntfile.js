module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("main-bower-files");
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            main: {
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    transform: [["babelify", {"presets": "env"}]]
                },
                src: "src/game/**/*.js",
                dest: "src/lib/scripts/app.js"
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: '*',
                    base: './deploy'
                }
            }
        },
        concat: {
            dist: {
                src: [
                    // "node_modules/phaser/dist/phaser.min.js",

                    "src/lib/**/phaser.min.js",
                    "src/lib/**/app.js",
                    //"src/lib/**/*.js"
                    //  "src/game/translated/**/*.js",
                    // "src/scripts/**/*.js"
                ],
                dest: 'deploy/js/<%= pkg.name %>.js'
            }
        },
        watch: {
            files: ['src/game/**/*.js', 'src/tests/**/*.js'],
            tasks: ['test', 'browserify', 'concat'],
            options: {
                spawn: true,
            }
        },
        bower: {
            flat: {
                dest: 'src/lib/scripts',
                options: {
                    debugging: true
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: ['babel-register',
                        function () {
                            chai = require('./node_modules/chai/chai.js');
                        },
                        function () {
                            sinon = require('./node_modules/sinon/lib/sinon.js');
                        }
                    ]
                },

                src: ['src/tests/**/*.js']
            }
        }
    });

    grunt.registerTask('deploy', ['bower', 'concat']);
    grunt.registerTask('serve', ['deploy', 'connect', 'watch']);
    grunt.registerTask('default', ['test', 'serve']);
    grunt.registerTask('test', ['mochaTest']);

}

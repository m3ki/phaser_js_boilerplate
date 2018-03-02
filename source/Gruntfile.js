module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("main-bower-files");

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      main: {
        options: {
          browserifyOptions: {
            debug: true
          },
          transform: [["babelify", { "presets": "env" }]]
        },
        src: "src/game/*.js",
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

          "src/lib/**/*.js",
          //  "src/game/translated/**/*.js",
          "src/scripts/**/*.js"
        ],
        dest: 'deploy/js/<%= pkg.name %>.js'
      }
    },
    watch: {
      files: 'src/**/*.js',
      tasks: ['browserify'],
        options: {
            spawn: false,
        }
    },
    bower: {
      flat: {
        dest: 'src/lib/scripts',
        options: {
          debugging: true
        }
      }



    }
  });

  grunt.registerTask('default', ['bower', 'concat', 'connect', 'watch']);

}

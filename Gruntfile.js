module.exports = function(grunt) {
//config
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

//        uglify: {
//          options: {
//            mangle:false
//          },
//          build: {
//            src:
//            [ 'app/js/routes.js',
//              'app/js/controllers.js',
//              'app/js/directives.js',
//              'app/js/filters.js',
//              'app/js/services.js'],
//            dest: 'app/js/build/app.min.js'
//          }
//        },
        useminPrepare: {
          html: 'app/views/index.html',
          options: {
            root: 'app',
            dest: 'dist'
          }
        },
        usemin: {
          html: 'app/views/index.html',
          options: {
            root: 'app',
            dest: 'dist',
            blockReplacements: {
                js: function (block) {
                    grunt.log.debug(JSON.stringify(block.dest));
                    console.log(JSON.stringify(block.dest));
                    return '<script src="../../dist/'+block.dest+'"></script>';
                }
            }
          }
        },
        uglify: {
          options: {
              report: 'min',
              mangle: false
          }
        },
        compass: {
          dist: {
            options: {
              sassDir: 'app/css',
              cssDir:  'app/css/build',
              outputStyle: 'compressed'
            }
          }
        },
        watch: {
          options: {
            livereload: true
          },
          scripts: {
            files: ['app/js/*.js', 'app/lib/vendors/jquery.min.js'],
            tasks: ['uglify'],
          },
          css: {
            files: ['app/css/*.scss'],
            tasks: ['compass'],
          },
          html: {
            files: ['app/views/index.html', 'app/views/partials/*.html']
          }
        }
    });

//load
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

//default task - development, run 'grunt'
    grunt.registerTask('default', ['compass', 'watch']);
//production task, run 'grunt prod'
    grunt.registerTask('prod', ['useminPrepare', 'concat', 'uglify', 'usemin']);
};

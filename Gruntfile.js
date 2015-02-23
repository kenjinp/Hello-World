module.exports = function(grunt) {
//config
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
          options: {
            mangle:false
          },
          build: {
            src:
            [ 'app/js/routes.js',
              'app/js/controllers.js',
              'app/js/directives.js',
              'app/js/filters.js',
              'app/js/services.js'],
            dest: 'app/js/build/app.min.js'
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
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

//default tasks
    grunt.registerTask('default', ['uglify', 'compass', 'watch']);

};

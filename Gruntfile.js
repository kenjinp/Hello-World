module.exports = function(grunt) {
//config
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
          build: {
            src: ['app/lib/angular/*.js',
                  'app/lib/vendor/*.js',
                  'app/js/*.js'],
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
          scripts: {
            files: ['app/lib/angular/*.js',
                    'app/lib/vendor/*.js',
                    'app/js/*.js'],
            tasks: ['uglify'],
            options: {
              spawn: false,
            }
          },
          css: {
            files: ['app/css/*.scss'],
            tasks: ['compass'],
            options: {
              spawn: false,
              livereload: true
            }
          }
        }
    });

//load
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

//default tasks
    grunt.registerTask('defualt', ['uglify', 'compass', 'watch']);

};

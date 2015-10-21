module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
          src: ['themes/sapota/js/src/*.js'],
          dest: 'themes/sapota/js/build/scripts.js'
      }
    },
    
    uglify: {
        build: {
            src: 'themes/sapota/js/build/scripts.js',
            dest: 'themes/sapota/js/build/scripts.min.js'
        }
    },
    
    sass: {
        dist: {
            options: {
                style: 'compact'
            },
            files: {
                'themes/sapota/css/style.css': 'themes/sapota/css/style.scss'
            }
        }
    },
    
    watch: {
        options: { livereload: true, },
        scripts: {
            files: ['themes/sapota/js/src/*.js'],
            tasks: ['concat', 'uglify'],
            options: {
                spawn: false,
            },
        },
        css: {
            files: ['themes/sapota/css/*.scss'],
            tasks: ['sass'],
            options: {
                spawn: false,
            }
        }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('default', ['concat', 'uglify', 'watch', 'sass']);

};


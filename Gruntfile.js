/*global module:false*/
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
        separator: ';'
        // sourceMap: true
      },
      vendor: {
        src: [
          'jquery/dist/jquery.js',
          'bootstrap/dist/js/bootstrap.js',
          'underscore/underscore.js',
          'fullpage/jquery.fullPage.js'
        ].map(function(path){
          return './bower_components/' + path;
        }),
        dest: 'static/js/vendor.js'
      },
      main: {
        src: [ 'js/main.js' ],
        dest: 'static/js/main.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        files: {
          'static/js/vendor.min.js': 'static/js/vendor.js',
          'static/js/main.min.js': 'static/js/main.js'
        }
      }
    },
    less: {
      main: {
        files: {
          'static/css/main.css': 'less/main.less'
        }
      }
    },
    cssmin: {
      main: {
        files: {
          'static/css/main.min.css': 'static/css/main.css'
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      js: {
        files: ['js/**/*.js'],
        tasks: ['concat']
      },
      css: {
        files: ['less/**/*.less'],
        tasks: ['less']
      },
      jade: {
        files: ['jade/**/*.jade'],
        tasks: ['jade']
      }
    },
    cacheBust: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 16,
        ignorePatterns: []
      },
      main: {
        files: [{
          src: [ 'index.html' ]
        }]
      }
    },
    jade: {
      compile: {
        options: {
          client: false,
          pretty: true
        },
        files: {
        'index.html': 'jade/index.jade'
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-cache-bust');

  // Default task.
  grunt.registerTask('default', ['concat', 'less', 'jade']);
  grunt.registerTask('init', ['default', 'watch']);
  grunt.registerTask('build', ['default', 'uglify', 'cssmin', 'cacheBust'])
};

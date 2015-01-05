var skills = {
  frontend: {
    'Programming Languages': [ 'Javascript', 'Coffeescript' ],
    'Technologies': [ 'HTML5', 'CSS3' ],
    'Frameworks & Libraries': [ 'BackboneJS', 'EmberJS', 'AngularJS', 'JQuery', 'UnderscoreJS', 'Jade', 'HandlebarsJS', 'LESS', 'SASS', 'RaphaelJS' ],
    'Package Managers': [ 'Bower' ]
  },
  backend: {
    'Programming Languages': [ 'Ruby', 'Python', 'C', 'Java' ],
    'Technologies': [ 'NodeJS (basics)', 'Ruby Rack Server' ],
    'Frameworks & Libraries': [ 'Ruby on Rails', 'Devise', 'Grape API Middleware', 'Datamapper ORM' ],
    'Databases': [ 'Postgres' ],
    'Package Managers': [ 'npm', 'ruby gems' ]
  },
  testing: {
    'Frameworks & Libraries': [ 'Jasmine', 'SinonJS', 'rspec' ],
    'Automation': [ 'Selenium (Python)' ]
  },
  deployment: {
    'Cloud Computing Services': [ 'AWS', 'Heroku' ],
    'Task runners': [ 'Grunt' ]
  },
  design: {
    'Tools': [ 'Sketch App', 'Adobe After Effects', 'Adobe Illustrator' ]
  }
};

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
        dest: 'public/js/vendor.js'
      },
      main: {
        src: [ 'js/main.js' ],
        dest: 'public/js/main.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        files: {
          'public/js/vendor.min.js': 'public/js/vendor.js',
          'public/js/main.min.js': 'public/js/main.js'
        }
      }
    },
    less: {
      main: {
        files: {
          'public/css/main.css': 'less/main.less'
        }
      }
    },
    cssmin: {
      main: {
        files: {
          'public/css/main.min.css': 'public/css/main.css'
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
          src: [ 'public/index.html' ]
        }]
      }
    },
    jade: {
      compile: {
        options: {
          client: false,
          pretty: true,
          data: {
            skills: skills
          }
        },
        files: {
        'public/index.html': 'jade/index.jade'
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

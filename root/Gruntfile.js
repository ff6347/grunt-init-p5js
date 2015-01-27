/*global module:false*/
module.exports = function(grunt) {
  var now = new Date();
require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    wiredep: {
      target: {

        // Point to the files that should be updated when
        // you run `grunt bower-install`
        src: [
          'index.html' // .html support...
        ],

        // Optional:
        // ---------
        cwd: '',
        dependencies: true,
        devDependencies: false,
        exclude: [],
        fileTypes: {},
        ignorePath: '',
        overrides: {}
      }
    },
        markdown: {
      all: {
          options: {
            template: 'docs/template.html',
              gfm: true,
              highlight: 'auto',
            // preCompile: function(src, context) {},
            // postCompile: function(src, context) {},
            templateContext: {
              title:'<%= pkg.name %>',
              now:now.getUTCFullYear().toString() + '-' + (now.getUTCMonth() + 1).toString() + '-' + now.getUTCDate().toString()
            },

              // codeLines: {
              //   before: '<span>',
              //   after: '</span>'
              // }

          },
        files: [{
          expand: true,
          src: './README.md',
          dest: './docs/',
          ext: '.html'
        }]
      }
    },
  });

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('md', ['markdown']);
  // Default task.
  grunt.registerTask('default', ['wiredep']);

};
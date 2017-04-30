var credentials = require('./.screeps');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-screeps');

  grunt.initConfig({
    screeps: {
      options: credentials,
      dist: {
        src: ['src/*.js']
      }
    },
    jasmine: {
      src: 'src/**/*.js',
      options: {
        vendor: 'lib.require.js',
        specs: 'specs/**/*.js',
        template: require('grunt-template-jasmine-requirejs'),
        templateOptions: {
          requireConfig: {}
        }
      }
    },
    watch: {
      files: ['src/**/*.js', 'specs/**/*.js'],
      tasks: ['jasmine']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
};

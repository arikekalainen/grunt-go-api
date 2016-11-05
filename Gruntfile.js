/*
 * grunt-go-api
 * https://github.com/arikekalainen/grunt-go-api
 *
 * Copyright (c) 2016 Ari Kekäläinen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['./test/expected/hellow*']
    },

    // Configuration to be run (and then tested).
    go_api: {
      build: {
        src: ["./test/resources/*.go"],
        app: "./test/expected/helloworld"
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Test task: clean, go_api and nodeunit tests
  grunt.registerTask('test', ['clean', 'go_api', 'nodeunit']);

  // By default, execute 'test' task
  grunt.registerTask('default', ['test']);

};

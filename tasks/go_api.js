/*
 * grunt-go-api
 * https://github.com/arikekalainen/grunt-go-api
 *
 * Copyright (c) 2016 Ari Kekäläinen
 * Licensed under the MIT license.
 */

'use strict';

// For running the go commands
var execSync = require('child_process').execSync;

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('go_api', 'Go command api plugin for running go commands', function() {
    
      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({
        punctuation: '.',
        separator: ', '
      });

      // Collect source files
      let sourceFiles = [];
      // Iterate over all specified file groups.
      this.files.forEach(function(f) {

        // Concat specified files.
        const src = f.src
          .filter((filepath) => {
              // Warn on and remove invalid source files (if nonull was set).
              if (!grunt.file.exists(filepath)) {
                  grunt.log.warn('Source file "' + filepath + '" not found.');
                  return false;
              } else {
                  return true;
              }
          })
          .map(function(filepath) {
              // return source file path
              return filepath;
          })
          .join(grunt.util.normalizelf(options.separator));

          // Push each source to sourceFiles
          const sources = src.split(options.separator);
          sources.forEach(source => sourceFiles.push(source));
      });


      // Command string to executed
      let commands = [];

      // Check the GO command and construct command for nodejs execSync(..)
    
      if (this.target === "build") {

          // Application name
          let appName = this.data.app ? this.data.app : "app.out";
          
          // Check the postfix for target app
          if (!appName.endsWith(".exe")) {
              appName += process.platform === "win32" ? ".exe" : "";
          }

          let command = "go build -o " + appName;
          // Check build flags
          // TODO : some more strict validation would be nive to have
          // ref: https://golang.org/cmd/go/#hdr-Compile_packages_and_dependencies

          if (this.data.flags && this.data.flags !== "") {
              command += " -i " + this.data.flags;
          }
          command += " " + sourceFiles.toString().replace(",", " "); 

          // push to command list
          commands.push(command);

      }
      if (this.target === "run") {
          sourceFiles.forEach((sourceFile) => {
              const command = "go run " + sourceFile;
              commands.push(command);
          })
      }

      if (commands.length === 0) {
          grunt.fail.warn("Go command is not supported, yet !")
      }

      // Execute GO command
      commands.forEach((command) => {
          grunt.log.writeln("Running Go command: " + command);
          try {
              execSync(command, {cwd: process.cwd() });  
          } catch (error) {
              grunt.fail.fatal("Go command execution failed : ", error);
          }          
      })

      grunt.log.writeln("Task '" + this.name + ":" + this.target  + "' done !");

    });

};

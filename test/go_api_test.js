/*
 * grunt go api plugin tests
 */
'use strict';
const fs = require('fs');

exports.go_api_test = {
    setUp: (done) => {
        // setup here if necessary
        done();
    },
    // Test build -task
    test_build: (test) => {

        // check that helloworld executable exists
        let expectedFile = "./test/expected/"; 
        expectedFile += process.platform === "win32" ? "helloworld.exe" : "helloworld"; 

        fs.access(expectedFile, (err) => {
            if (err) {
                test.ok(false, expectedFile + " executable does not exist, build failed?");
            } else {
                test.ok(true, "Nice, build works");
            }
            test.done();
        });
    }
};

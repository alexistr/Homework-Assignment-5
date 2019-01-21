/*
* Tests
*
*/
"use strict";
//Dependencies
const lib = require ('../app/lib');
const assert = require('assert');

let _app = {};
_app.tests = {};
_app.tests.unit = {};

// Unit tests
_app.tests.unit['This test always fails!'] = (done) => {
  assert.ok(false);
  done();
};

_app.tests.unit['This test always pass!'] = (done) => {
  assert.ok(true);
  done();
};

_app.tests.unit['lib.parseArgsToObject(\'test-0-0-0\') should return {\'tag\':\'test\',\'id\':0,\'id_mat\':0,\'id_elv\': 0}.'] =  (done) => {
  let val = lib.parseArgsToObject('test-0-0-0');
  assert.deepEqual(val , {'tag':'test','id':0,'id_mat':0,'id_elv': 0});
  done();
};

_app.tests.unit['lib.parseArgsToObject(\'randomString\') should return false.'] =  (done) => {
  let val = lib.parseArgsToObject('randomString');
  assert.ok(val === false);
  done();
};

_app.tests.unit['lib.parseArgsToObject() should not throw if call without parameter. It should return false.'] =  (done) => {
  assert.doesNotThrow(() => {
    let val = lib.parseArgsToObject();
    assert.ok(val === false);
    done();
  },TypeError);
};

_app.tests.unit['lib.findNeedle should callback a false error and index of type Number when needle is found.'] =  (done) => {
  lib.findNeedle([1,2,3,4,5,6],4,(err,index) => {
    assert.equal(err , false);
    assert.equal(typeof(index),'number');
    done();
  });
};

_app.tests.unit['lib.findNeedle should callback a false error and false index when needle not found'] =  (done) => {
  lib.findNeedle([1,2,3,4,5,6],7,(err,index) => {
    assert.equal(err , false);
    assert.equal(index,false);
    done();
  });
};

_app.tests.unit['lib.findNeedle should not throw if haystack is note iterable but callback an error'] =  (done) => {
  assert.doesNotThrow(() => {
    lib.findNeedle(null,null,(err,index) => {
      assert.ok(err);
      done();
    });
  }, TypeError);

};





// Tests runner
_app.runTests = () => {
let errors = [];
let successes = 0;
let totalTests = 0;
Object.entries(_app.tests.unit).forEach(
  ([testName,testFunction]) => {
      (()=>{
      totalTests++;
      // Call the test function
      try{
        testFunction(() => {
          //If it calls back without throwing, then it succededed, so log iı in green.
          console.log('\x1b[32m%s\x1b[0m',testName);
          successes++;
        });
      }catch(e){
        // If  it throws, then it failed, so capture the error thrown and log it in red
        errors.push({
          'name' : testName,
          'error' : e
        });
        console.log('\x1b[31m%s\x1b[0m',testName);
        }
    })();
  }
);
_app.produceTestReport(totalTests,successes,errors);
};

// produce a test outcome report
_app.produceTestReport = (totalTests,successes,errors) => {
  console.log("");
  console.log("------------------BEGIN TEST REPORT-----------------");
  console.log("");
  console.log("Total Tests: ",totalTests);
  console.log("Pass: ",successes);
  console.log("Fail: ",errors.length);
  console.log("");
  // If there are errors, print them in detail
  if(errors.length > 0) {
    console.log("------------------BEGIN ERROR DETAILS-----------------");
    console.log("");

    errors.forEach((testError) => {
      console.log('\x1b[31m%s\x1b[0m',testError.name);
      console.log(testError.error);
      console.log("");

    });
    console.log("------------------END ERROR DETAILS-----------------");

  }
  console.log("");
  console.log("------------------END TEST REPORT-----------------");



};

// Run the tests
_app.runTests();

"use strict";

var obj = {
  firstName: "John",
  lastName: "Dow",
  today: new Date(),
  re: /(\w+)\s(\w+)/,
  dd: new Date(),
  getFullName: function () {
    return this.firstName + " " + this.lastName;
  },
  greetLambda: function (param) {
    var displayMessage = (function (msg1) {
      return function (msg2) {
        return msg1 + msg2;
      };
    }(param));
    return displayMessage("Lambda World!");
  }
},
  JSONfn = require('../jsonfn'),
  strfn,
  objfn;

function testBasic() {
  if (objfn.firstName === "John") {
    console.log('     basic.................   OK\n');
  } else {
    console.log('     basic.................   failure\n');
  }
}

function testFunction() {
  if (objfn.getFullName() === "John Dow") {
    console.log('     function..............   OK\n');
  } else {
    console.log('     function..............   failure\n');
  }
}

function testLambda() {
  if (objfn.greetLambda('Hello ') === "Hello Lambda World!") {
    console.log('     Lambda function.......   OK\n');
  } else {
    console.log('     Lambda function.......   failure\n');
  }
}

function testRegexp() {
  var str = 'John Smith';
  if (str.replace(objfn.re, "$2, $1") === 'Smith, John') {
    console.log('     RegExp................   OK\n');
  } else {
    console.log('     RegExp................   failure\n');
  }
}

function testDate() {
  if (objfn.dd.getTime && typeof objfn.dd.getTime === 'function') {
    console.log('     Date..................   OK\n');
  } else {
    console.log('     Date..................   failure\n');
  }
}

console.log('\n======= Test started =======\n\n');

console.log('  Stringifying original object.......\n');

strfn = JSONfn.stringify(obj, true);
console.log(strfn);
console.log('\n  Parsing this string....... ');
objfn = JSONfn.parse(strfn, true);
console.log('\n  Running tests: \n');

testBasic();
testFunction();
testLambda();
testRegexp();
testDate();

console.log('\n\n======= Test finished =======\n');




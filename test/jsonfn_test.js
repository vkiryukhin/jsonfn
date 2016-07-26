"use strict";

var obj = {
    firstName: "John",
    lastName: "Dow",
    today: new Date(),
    re: /(\w+)\s(\w+)/,
    getFullName: function () {
      return this.firstName + " " + this.lastName;
    },
    getFullNameArrow: () => {
      return this.firstName + " " + this.lastName;
    },
    arrowFnSimple: a => a > 10 ? 10 : a,
    arrowFn: (a, b) => a > b ? a : b,
    greetLambda: function (param) {
      var displayMessage = (function (msg1) {
        return function (msg2) {
          return msg1 + msg2;
        };
      }(param));
      return displayMessage("Lambda World!");
    }
  },
  JSONfn = (typeof exports === 'undefined') ? window.JSONfn : require('../jsonfn'),
  strfn,
  objfn;

function testBasic(objfn) {
  if (objfn.firstName === "John") {
    console.log('     basic.................   OK\n');
  } else {
    console.log('     basic.................   failure\n');
  }
}

function testFunction(objfn) {
  if (objfn.getFullName() === "John Dow") {
    console.log('     function..............   OK\n');
  } else {
    console.log('     function..............   failure\n');
  }
}

function testLambda(objfn) {
  if (objfn.greetLambda('Hello ') === "Hello Lambda World!") {
    console.log('     Lambda function.......   OK\n');
  } else {
    console.log('     Lambda function.......   failure\n');
  }
}

function testRegexp(objfn) {
  var str = 'John Smith';
  if (str.replace(objfn.re, "$2, $1") === 'Smith, John') {
    console.log('     RegExp................   OK\n');
  } else {
    console.log('     RegExp................   failure\n');
  }
}

function testDate(objfn) {
  if (objfn.today.getTime && typeof objfn.today.getTime === 'function') {
    console.log('     Date..................   OK\n');
  } else {
    console.log('     Date..................   failure\n');
  }
}

function testArrowFn(objfn) {
  if (objfn.arrowFn(11,22) === 22) {
    console.log('     arrowFunction.........   OK\n');
  } else {
    console.log('     arrowFunction.........   failure\n');
  }
}

function testArrowFnSimple(objfn) {
  if (objfn.arrowFnSimple(123) === 10) {
    console.log('     arrowFunctionSimple...   OK\n');
  } else {
    console.log('     arrowFunctionSimple...   failure\n');
  }
}

function testArrowFnRegular(objfn) {
  if (objfn.getFullNameArrow() === "John Dow") {
    console.log('     arrowFunctionRegular..   OK\n');
  } else {
    console.log('     arrowFunctionRegular..   failure\n');
  }
}


console.log('\n\n======= Test started =======\n\n');

console.log('  Stringifying original object.......\n');

strfn = JSONfn.stringify(obj, true);
console.log(strfn);
console.log('\n  Parsing this string....... ');
objfn = JSONfn.parse(strfn, true);
console.log('\n  Running tests: \n');

testBasic(objfn);
testFunction(objfn);
testLambda(objfn);
testRegexp(objfn);
testDate(objfn);
testArrowFn(objfn);
testArrowFnSimple(objfn);
testArrowFnRegular(objfn);

console.log('  Cloning original object.......\n');

console.log('  Run test on clonned object:\n');

objfn = JSONfn.clone(obj, true);

testBasic(objfn);
testFunction(objfn);
testLambda(objfn);
testRegexp(objfn);
testDate(objfn);
testArrowFn(objfn);
testArrowFnSimple(objfn);
testArrowFnRegular(objfn);

console.log('\n\n======= Test finished =======\n\n');




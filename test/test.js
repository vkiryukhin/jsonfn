const jsonFn = require('../jsonfn');

const testObject = {
  value: 1234,
  string: '1234',
  code: function(a) {
    return a * 2;
  }
};

const stringify = jsonFn.stringify(testObject, true);
console.log(stringify);

const parse = jsonFn.parse(stringify, null, true);
console.log(parse);

const helpers = {
  for: function(from, to, opt) {
    let acc = '';
    for(var i = from; i <= to; i += 1)
        acc += opt.fn(i);
    return acc;
  },
  test: function(a, op, b, opt) {
    const operators = {
      '==': (a, b) =>  a == b,
      '!=': (a, b) =>  a != b,
      '<=': (a, b) =>  a <= b,
      '>=': (a, b) =>  a >= b,
      '<': (a, b) =>  a < b,
      '>': (a, b) =>  a > b
    }
    return operators[op](a, b) ? opt.fn(this) : opt.inverse(this)
  }
}

module.exports = helpers

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('index_of', function(context,ndx) {
  return context[ndx];
});

Handlebars.registerHelper('math', function(lvalue, operator, rvalue) {lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);
  return {
      "+": lvalue + rvalue,
      "-": lvalue - rvalue,
      "*": lvalue * rvalue,
      "/": lvalue / rvalue,
      "%": lvalue % rvalue
  }[operator];
});
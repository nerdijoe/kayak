

exports.getCaseInsensitiveRegex = function(string){
  var regex = new RegExp(["^", string, "$"].join(""), "i");
  return regex;
};
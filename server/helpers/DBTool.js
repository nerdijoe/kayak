

exports.getCaseInsensitiveRegex = function(string){
  var regex = new RegExp(["^", string, "$"].join(""), "i");
  return regex;
};

const priceMap = new Map();
priceMap.set("Business", 0);
priceMap.set("Economy", 1);
priceMap.set("First", 2);
exports.priceMap = priceMap;
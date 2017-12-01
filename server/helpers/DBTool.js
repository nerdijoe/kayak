

exports.getRegex = function(string, caseInsensitive = true){
  var regex;
  if(caseInsensitive){
    regex = new RegExp(["^", string, "$"].join(""), "i");
  } else{
    regex = new RegExp(["^", string, "$"].join(""));
  }
  return regex;
};

exports.getPartialRegex = function(string, caseInsensitive = true){
  if(caseInsensitive){
    regex = new RegExp(string, "i");
  } else{
    regex = new RegExp(string);
  }
  return regex;
};

const priceMap = new Map();
priceMap.set("Business", 0);
priceMap.set("Economy", 1);
priceMap.set("First", 2);
exports.priceMap = priceMap;
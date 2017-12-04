

exports.generateKey = function(key, query){
  return key+"_"+JSON.stringify(query);
}
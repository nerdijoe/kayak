
var redisClient = require('./redis').client;

exports.get = function(key, callback){
  redisClient.get(key, function (err, reply) {
    if (err) throw err;
    console.log("==>GET " + key +" from cache");
    console.log(reply);
    callback(reply);
  });
};

exports.set = function(key, value){
  redisClient.set(key, value, 'EX', 20);
}


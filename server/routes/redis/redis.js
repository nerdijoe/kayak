


var redis = require('redis');
var redisClient = redis.createClient(); //creates a new client

// global.redisClient = redisClient;

function setupClient(){
  redisClient.on('connect', function() {
    console.log('Redis connected');
  });
}

exports.client = redisClient;
exports.setupClient = setupClient;
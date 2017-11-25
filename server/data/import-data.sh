#!/bin/bash

#mongoimport --db kayak --collection cities --drop --file data/cities.json --jsonArray
#mongoimport --db kayak --collection states --drop --file data/states.json --jsonArray
#mongoimport --db kayak --collection countries --drop --file data/countries.json --jsonArray

//import into local database
#mongoimport --db kayak --collection airlines --drop --file data/airlines.json --jsonArray
#mongoimport --db kayak --collection airports --drop --file data/airports.json --jsonArray

//import into cloud database
mongoimport --uri "mongodb://nerdijoe:7jk6*g6AEL@cluster0-shard-00-00-i5u9w.mongodb.net:27017,cluster0-shard-00-01-i5u9w.mongodb.net:27017,cluster0-shard-00-02-i5u9w.mongodb.net:27017/kayak_dev?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin" --collection airlines --drop --file data/airlines.json --jsonArray
mongoimport --uri "mongodb://nerdijoe:7jk6*g6AEL@cluster0-shard-00-00-i5u9w.mongodb.net:27017,cluster0-shard-00-01-i5u9w.mongodb.net:27017,cluster0-shard-00-02-i5u9w.mongodb.net:27017/kayak_dev?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin" --collection airports --drop --file data/airports.json --jsonArray



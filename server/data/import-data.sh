#!/bin/bash

#mongoimport --db kayak --collection cities --drop --file data/cities.json --jsonArray
#mongoimport --db kayak --collection states --drop --file data/states.json --jsonArray
#mongoimport --db kayak --collection countries --drop --file data/countries.json --jsonArray

#import into local database
#mongoimport --db kayak --collection airlines --upsert --file data/airlines.json --jsonArray
#mongoimport --db kayak --collection airports --upsert --file data/airports.json --jsonArray

#import into cloud database
#mongoimport --host cluster0-shard-00-00-i5u9w.mongodb.net:27017,cluster0-shard-00-01-i5u9w.mongodb.net:27017,cluster0-shard-00-02-i5u9w.mongodb.net:27017 --ssl -u nerdijoe -p '7jk6*g6AEL' --authenticationDatabase admin  --db kayak_dev --collection airlines --drop --file data/airlines.json --jsonArray
#mongoimport --host cluster0-shard-00-00-i5u9w.mongodb.net:27017,cluster0-shard-00-01-i5u9w.mongodb.net:27017,cluster0-shard-00-02-i5u9w.mongodb.net:27017 --ssl -u nerdijoe -p '7jk6*g6AEL' --authenticationDatabase admin  --db kayak_dev --collection airports --drop --file data/airports.json --jsonArray

#mongoimport --host cluster0-shard-00-00-i5u9w.mongodb.net:27017,cluster0-shard-00-01-i5u9w.mongodb.net:27017,cluster0-shard-00-02-i5u9w.mongodb.net:27017 --ssl -u nerdijoe -p '7jk6*g6AEL' --authenticationDatabase admin  --db kayak_dev --collection flights --drop --file data/flights.json --jsonArray
#mongoimport --host cluster0-shard-00-00-i5u9w.mongodb.net:27017,cluster0-shard-00-01-i5u9w.mongodb.net:27017,cluster0-shard-00-02-i5u9w.mongodb.net:27017 --ssl -u nerdijoe -p '7jk6*g6AEL' --authenticationDatabase admin  --db kayak_dev --collection hotels --drop --file data/hotels.json --jsonArray

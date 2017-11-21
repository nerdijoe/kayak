#!/bin/bash

#mongoimport --db kayak --collection cities --drop --file data/cities.json --jsonArray
#mongoimport --db kayak --collection states --drop --file data/states.json --jsonArray
#mongoimport --db kayak --collection countries --drop --file data/countries.json --jsonArray

mongoimport --db kayak --collection airlines --drop --file data/airlines.json --jsonArray
mongoimport --db kayak --collection airports --drop --file data/airports.json --jsonArray
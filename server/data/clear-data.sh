#!/bin/bash

mongo kayak --eval "db.countries.drop()"
mongo kayak --eval "db.states.drop()"
mongo kayak --eval "db.cities.drop()"
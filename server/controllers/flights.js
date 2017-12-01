const mongoose = require('mongoose');
const Flight = require('../models/mongooseFlight');
const FlightAirline = require('../models/mongooseFlightAirline');
const FlightAirport = require('../models/mongooseFlightAirport');
const moment = require('moment');
const TimeTool = require('../helpers/TimeTool');
const DBTool = require('../helpers/DBTool');

// Edit flight
// /flights/:id
// 5a1cb1f0b2e35b2b6c4e9ff9
exports.edit = (req, res) => {
  console.log('edit flight');
  const id = req.params.id;
  const data = req.body;

  Flight.findByIdAndUpdate(
    id,
    {
      $set: {
        flightNumber: data.flightNumber,
        departureTime: data.departureTime,
        arrivalTime: data.arrivalTime,
        departureAirport: data.departureAirport,
        arrivalAirport: data.arrivalAirport,
        airline: data.airline,
        class: data.class,
        price: data.price,
      },
    },
    (err, result) => {
        if (err) res.json(err);
        Flight.findById(id)
          .populate('departureAirport')
          .populate('arrivalAirport')
          .populate('airline')
          .exec(function(err, flights){
            if (err){
              console.error(err);
            } else{
              console.log(flights);
              res.json(flights);
            }
          });
      }
    );
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Flight.findByIdAndUpdate(
    id,
    {
      $set: {
        isDeleted: true,
      },
    },
    (err, result) => {
    if (err) res.json(false);
      res.json(true);
    }
  );
};

//- Search Flight
//Get /flights/search?departure=SJC&arrivalAt=SFO&departureDate=11/25/2017
exports.search = (req, res) => {
  console.log('search flight');
  const data = req.query;
  console.log(data);

  var departure = data.departure;
  var arrival = data.arrivalAt;
  var departureDate = data.departureDate;

  var results = [];
  var result_json;

  Flight.find({})
    .populate('departureAirport arrivalAirport airline')
    .exec(function(err, flights){
      // console.log(flights);
      if (err){
        console.error(err);
      } else{
        for (var i = 0; i < flights.length; i++){

          var flight = flights[i];

          if(TimeTool.isSameDay(flight.departureTime, departureDate) && flight.departureAirport.city.toUpperCase() === departure.toUpperCase() && flight.arrivalAirport.city.toUpperCase() === arrival.toUpperCase()){

            // console.log(flight);
            result_json = {};
            result_json.airlines = flight.airline.name;
            result_json.flightNumber = flight.flightNumber;
            result_json.departTime = flight.departureTime;
            result_json.arrivalTime = flight.arrivalTime;
            result_json.origin = getAirportLocation(flight.departureAirport);
            result_json.destination = getAirportLocation(flight.arrivalAirport);
            result_json.flightDuration = TimeTool.getDuration(flight.departureTime, flight.arrivalTime);
            result_json.class = flight.class;
            result_json.price = flight.price;

            results.push(result_json);
          }
        }
        res.json(results);
      }
    });
};

function getAirportLocation(airport){
  return airport.code + ', ' + airport.city + ', ' + airport.state + ', ' + airport.country;
}

exports.create = (req, res) => {
  console.log('createNewFlight');
  const data = req.body;
  // console.log(data);

  Flight.create({
    flightNumber: data.flightNumber,
    departureTime: data.departureTime,
    arrivalTime: data.departureTime,
    departureAirport: mongoose.Types.ObjectId(data.departureAirport),
    arrivalAirport: mongoose.Types.ObjectId(data.arrivalAirport),
    airline: mongoose.Types.ObjectId(data.airline),
    class: data.class,
    price: data.price,
  }, function(err, newFlight){
    if(err){
      console.error(err);
    } else{
      console.log(newFlight);
      Flight.findById(newFlight._id)
        .populate('departureAirport')
        .populate('arrivalAirport')
        .populate('airline')
        .exec(function(err, flights){
          if (err){
            console.error(err);
          } else{
            console.log(flights);
            res.json(flights);
          }
        });
    }
  });
};

exports.getAll = (req, res) => {
  Flight
    .find({})
    .populate('departureAirport')
    .populate('arrivalAirport')
    .populate('airline')
    .exec((err, results) => {
      // console.log('getAll results=', results);
      if (err) res.json(err);
      res.json(results);
    });
};

exports.getAllAirlines = (req, res) => {
  FlightAirline
    .find({})
    .exec((err, results) => {
    console.log('getAll results=', results);
  if (err) res.json(err);
  res.json(results);
});
};

exports.getAllAirports = (req, res) => {
  FlightAirport
    .find({name: { $ne: "" }})
    .exec((err, results) => {
    // console.log('getAll results=', results);
      if (err) res.json(err);
      res.json(results);
    });
};

exports.searchAirportByCity = (req, res) => {
  const city = req.params.city;
  FlightAirport
    .find({city: DBTool.getPartialRegex(city)})
    .exec((err, results) => {
    console.log('results=', results);
  if (err) res.json(err);
  res.json(results);
});
}

exports.searchAirlineByName = (req, res) => {
  const name = req.params.name;
  FlightAirline
    .find({name: DBTool.getPartialRegex(name)})
    .exec((err, results) => {
    console.log('results=', results);
  if (err) res.json(err);
  res.json(results);
});
}

exports.getOne = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  Flight
    .findById(id)
    .populate('departureAirport')
    .populate('arrivalAirport')
    .populate('airline')
    .exec((err, result) => {
      console.log('getOne result=', result);
      if (err) res.json(err);
      res.json(result);
    });
};

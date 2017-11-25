const mongoose = require('mongoose');
const Flight = require('../models/mongooseFlight');
const FlightAirline = require('../models/mongooseFlightAirline');
const FlightAirport = require('../models/mongooseFlightAirport');
const moment = require('moment');
// const HotelReview = require('../models/mongooseHotelReview');
// const HotelRoom = require('../models/mongooseHotelRoom');


//- Search Flight
//Get /flights/search?departure=SJC&arrivalAt=SFO&class=Economy

exports.search = (req, res) => {
  console.log('search flight');
  const data = req.query;
  console.log(data);

  var departure = data.departure;
  var arrivalAt = data.arrivalAt;
  var flightClass = data.class;

  var result = [];

  Flight.find({})
    .populate('departureAirport')
    .populate('arrivalAirport')
    .populate('airline')
    .exec(function(err, flights){
      if (err){
        console.error(err);
      } else{
        console.log(flights);

        for (var i = 0; i < flights.length; i++){
          var flight = flights[i];
          if(flight.departureAirport.iata === departure && flight.arrivalAirport.iata === arrivalAt){
            result.push(flight);
          }
        }

        res.json(result);
      }
    });


};

exports.create = (req, res) => {
  console.log('createNewFlight');
  const data = req.body;
  // console.log(data);

  Flight.create({
    flightNumber: data.flightNumber,
    departureTime: moment(data.departureTime, "HH:mm:ss a").format(),
    arrivalTime: moment(data.arrivalTime, "HH:mm:ss a").format(),
    departureAirport: mongoose.Types.ObjectId(data.departureAirport),
    arrivalAirport: mongoose.Types.ObjectId(data.arrivalAirport),
    airline: mongoose.Types.ObjectId(data.airline),
    prices: data.prices,
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
    .exec((err, results) => {
      console.log('getAll results=', results);
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
    .find({})
    .exec((err, results) => {
    console.log('getAll results=', results);
  if (err) res.json(err);
  res.json(results);
});
};

exports.getOne = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  Flight
    .findById(id)
    .exec((err, result) => {
      console.log('getOne result=', result);
      if (err) res.json(err);
      res.json(result);
    });
};

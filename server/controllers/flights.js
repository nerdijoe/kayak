const mongoose = require('mongoose');
const Flight = require('../models/mongooseFlight');
const FlightAirline = require('../models/mongooseFlightAirline');
const FlightAirport = require('../models/mongooseFlightAirport');
const moment = require('moment');
const TimeTool = require('../helpers/TimeTool');
const DBTool = require('../helpers/DBTool');
// const HotelReview = require('../models/mongooseHotelReview');
// const HotelRoom = require('../models/mongooseHotelRoom');




// Edit flight
// /flights/:id
// 5a1cb1f0b2e35b2b6c4e9ff9
// {
//   flightNumber: "United 1449",
//     departureTime: "01:11 AM",
//   arrivalTime: "04:45 AM",
//   departureAirport: "5a1a0c7ab8522edae93c9cf0",
//   arrivalAirport: "5a1a0c7ab8522edae93c971a",
//   airline: "5a19e168b8522edae904a705",
//   prices: [{price:"160", type:"business"},
//   {price:"160", type:"economic"},
//   {price:"160", type:"first"}]
// }
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
        prices: data.prices,
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
//Get /flights/search?departure=SJC&arrivalAt=SFO&class=Economy&departureDate=11/25/2017

exports.search = (req, res) => {
  console.log('search flight');
  const data = req.query;
  console.log(data);

  var departure = data.departure;
  var arrivalAt = data.arrivalAt;
  var flightClass = data.class;
  var departureDate = data.departureDate;

  var results = [];
  var result_json;

  Flight.find({})
    .populate('departureAirport arrivalAirport airline')
    // .populate('departureAirport')
    // .populate('arrivalAirport')
    // .populate('airline')
    .exec(function(err, flights){
      if (err){
        console.error(err);
      } else{
        // console.log(flights);
        for (var i = 0; i < flights.length; i++){

          var flight = flights[i];
          if(flight.departureAirport.city.toUpperCase() === departure.toUpperCase() && flight.arrivalAirport.city.toUpperCase() === arrivalAt.toUpperCase()){

            console.log(flight);
            result_json = {};
            result_json.airlines = flight.airline.name;
            result_json.flightNumber = flight.flightNumber;
            result_json.departTime = flight.departureTime;
            result_json.arrivalTime = flight.arrivalTime;
            result_json.departureDate = departureDate;
            result_json.arrivalDate = TimeTool.getDepartureDate(departureDate, flight.departureTime, flight.arrivalTime);
            result_json.origin = getAirportLocation(flight.departureAirport);
            result_json.destination = getAirportLocation(flight.arrivalAirport);
            // result_json.imageURL = "http://localhost:3010/image/delta.jpg";
            result_json.flightDuration = TimeTool.getDuration(flight.departureTime, flight.arrivalTime);
            result_json.class = flightClass;
            result_json.price = flight.prices[DBTool.priceMap.get(flightClass)].price;

            results.push(result_json);
          }
        }
        /*
{
  airlines: "delta",
    flightNumber: 1234,
  departTime: "12h 30m ",
  arrivalTime: "22h 10m",
  departureDate: "Wed, Mar 23 2017",
  arrivalDate: "Wed, Mar 23 2017",
  origin: "Delhi, India",
  destination: "Mumbai, India",
  // imageURL: "../img/delta.jpg",
  imageURL: "http://localhost:3000/image/delta.jpg",
  flightDuration: "9h 40m",
  class: "Economy",
  price:120
}
*/

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
   console.log(data);

  Flight.create({
    flightNumber: data.flightNumber,
    departureTime: data.departureTime,
    arrivalTime: data.departureTime,
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
    .find({name: { $ne: "" }})
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
    .populate('departureAirport')
    .populate('arrivalAirport')
    .populate('airline')
    .exec((err, result) => {
      console.log('getOne result=', result);
      if (err) res.json(err);
      res.json(result);
    });
};

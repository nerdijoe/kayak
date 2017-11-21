const mongoose = require('mongoose');
const Flight = require('../models/mongooseFlight');
const moment = require('moment');
// const HotelReview = require('../models/mongooseHotelReview');
// const HotelRoom = require('../models/mongooseHotelRoom');

exports.create = (req, res) => {
  console.log('createNewFlight');
  const data = req.body;
  // console.log(data);

  Flight.create({
    flightNumber: data.flightNumber,
    departureTime: moment(data.departureTime, "HH:mm:ss a").format(),
    arrivalTime: moment(data.arrivalTime, "HH:mm:ss a").format(),
    departureAirport: data.departureAirport,
    arrivalAirport: data.arrivalAirport,
    airline: data.airline,
    prices: data.prices,
  }, function(err, newFlight){
    if(err){
      console.error(err);
    } else{

      Flight.find({_id: mongoose.Schema.Types.ObjectId(newFlight._id)})
        .populate('departureAirport')
        .exec(function(err, flights){
          if (err){
            console.error(err);
          } else{
            console.log(flights);
            res.json(flights);
          }
        })

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

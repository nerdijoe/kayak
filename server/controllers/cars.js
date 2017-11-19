const mongoose = require('mongoose');
const Car = require('../models/mongooseCar');
const CarDealer = require('../models/mongooseCarDealer');
const CarBilling = require('../models/mongooseCarBilling');

exports.create = (req, res) => {
  console.log('createNewCar');
  const data = req.body;

  Car.create({
    type: data.type,
    make: data.make,
    model: data.model,
    dealer: mongoose.Types.ObjectId(data.dealer),
    description: data.description,
    price: data.price,
    doorNumber: data.doorNumber,
    capacity: data.capacity,
  }, (err, newCar) => {
    res.json(newCar);
  });
};

exports.getAll = (req, res) => {
  Car
    .find({})
    .populate('dealer')
    .exec((err, results) => {
      console.log('getAll results=', results);
      if (err) res.json(err);
      res.json(results);
    });
};

exports.getOne = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  Car
    .findById(id)
    .populate('dealer')
    .exec((err, result) => {
      console.log('getOne result=', result);
      if (err) res.json(err);
      res.json(result);
    });
};

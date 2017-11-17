const mongoose = require('mongoose');
const CarDealer = require('../models/mongooseCarDealer');

exports.create = (req, res) => {
  console.log('createNewCar');
  const data = req.body;

  CarDealer.create({
    name: data.name,
    address: data.address,
    city: data.city,
    state: data.state,
    country: data.country,
    zipcode: data.zipcode,
  }, (err, newCarDealer) => {
    res.json(newCarDealer);
  });
};

exports.getAll = (req, res) => {
  CarDealer
    .find({})
    .exec((err, results) => {
      console.log('getAll results=', results);
      if (err) res.json(err);
      res.json(results);
    });
};

exports.getOne = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  CarDealer
    .findById(id)
    .exec((err, result) => {
      console.log('getOne result=', result);
      if (err) res.json(err);
      res.json(result);
    });
};

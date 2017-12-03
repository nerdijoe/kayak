const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Car = require('../models/mongooseCar');
const CarDealer = require('../models/mongooseCarDealer');
const CarBilling = require('../models/mongooseCarBilling');
const LogSearch = require('../models/mongooseLogSearch');

const cache = require('../routes/redis/cache');
const redis_keyConstants = require('../routes/redis/keyConstants');
const redis_keyHelper = require('../routes/redis/keyHelper');

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
    // res.json(newCar);

    CarDealer.populate(newCar, { path: 'dealer' }, (err, populatedResult) => {
      // Your populated translactions are inside populatedTransactions
      if (err) res.json(err);
      res.json(populatedResult);
    });
    
  });
};

exports.getAll = (req, res) => {
  Car
    .find({})
    .populate('dealer')
    .exec((err, results) => {
      // console.log('getAll results=', results);
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
      // console.log('getOne result=', result);
      if (err) res.json(err);
      res.json(result);
    });
};

exports.edit = (req, res) => {
  const id = req.params.id;

  // Car.findById(id)
  //   .exec((err, result) => {
  //     if (err) res.json(err);

  //     result.type = req.body.type;
  //     result.make = req.body.make;
  //     result.model = req.body.model;
  //     result.description = req.body.description;
  //     result.price = req.body.price
  //     result.
  //   });

  // skip updating dealer for now.
  Car.findByIdAndUpdate(
    id,
    {
      $set: {
        type: req.body.type,
        make: req.body.make,
        model: req.body.model,
        dealer: req.body.dealer,
        description: req.body.description,
        price: req.body.price,
        doorNumber: req.body.doorNumber,
        capacity: req.body.capacity,
      },
    },
    (err, result) => {
      console.log('after edit car result=', result);
      // if (result.nModified === 1) {
      //   console.log(`car id=[${id}] has been updated successfully`);
      //   res.json(true);
      // } else {
      //   res.json(false);
      // }
      // if (err) res.json(false);
      // res.json(true);

      Car
        .findById(result._id)
        .populate('dealer')
        .exec((err, populatedResult) => {
          console.log('populate result=', populatedResult);
          if (err) res.json(err);
          res.json(populatedResult);
        });
          // CarDealer.populate(result, { path: 'dealer' }, (err, populatedResult) => {
      //   // Your populated translactions are inside populatedTransactions
      //   if (err) res.json(err);
      //   res.json(populatedResult);
      // });
    }
  );
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Car.findByIdAndUpdate(
    id,
    {
      $set: {
        isDeleted: true,
      },
    },
    (err, result) => {
      console.log('after car delete result=', result);
      if (err) res.json(false);
      res.json(true);
    }
  );
};

exports.search = (req, res) => {
  console.log('car search');
  const searchString = req.body.searchString;
  console.log('    searchString=', searchString);

  var redis_key = redis_keyHelper.generateKey(redis_keyConstants.SEARCH_CARS, searchString);
  cache.get(redis_key, function (reply) {
    if(reply){
      console.log("get data from Redis");
      res.json(JSON.parse(reply));
    } else{
      console.log("get data from database");
      CarDealer
        .find({ $text: { $search: searchString } })
        .exec((err, results) => {
        console.log('CarDealer.find results=', results);

      Car
        .find({ dealer: { $in: results } })
        .populate('dealer')
        .exec((err, cars) => {
          console.log('Car.find cars=', cars);
          if (err) res.json(err);
          cache.set(redis_key, JSON.stringify(cars));
          res.json(cars);
        });
    })
    }
  });


};

// function insertLogSearch() {

// }

exports.searchByQuery = (req, res) => {
  console.log('car search');
  const searchString = req.query;

  console.log(`req.headers.token=[${req.headers.token}]`);

  let decoded = '';
  let userId = 0;
  if (req.headers.token) {
    decoded = jwt.verify(req.headers.token, process.env.JWT_KEY);
    if (decoded) {
      userId = decoded.id;
    }
  }
  console.log('    decoded=', decoded);
  console.log('    userId=', userId);

  LogSearch.create({
    userId,
    type: 'car',
    dealerCity: searchString.city,
  }, (err, log) => {
    if (err) res.json(err);
    console.log(log);
  });

  console.log('    searchString=', searchString);

  CarDealer
    .find({ $text: { $search: searchString.city } })
    .exec((err, results) => {
      console.log('CarDealer.find results=', results);

      Car
        .find({ dealer: { $in: results } })
        .populate('dealer')
        .exec((err, cars) => {
          console.log('Car.find cars=', cars);
          if (err) res.json(err);
          res.json(cars);
        });
    });
};


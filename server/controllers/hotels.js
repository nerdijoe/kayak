const mongoose = require('mongoose');
const Hotel = require('../models/mongooseHotel');
// const HotelReview = require('../models/mongooseHotelReview');
// const HotelRoom = require('../models/mongooseHotelRoom');

exports.search = (req, res) => {
  console.log('search flight');
  const data = req.query;
  console.log(data);

  var where = data.where;

  var result = [];

  Hotel.find({city: where})
    .exec(function(err, hotels){
      if (err){
        console.error(err);
      } else{
        console.log(hotels);
        res.json(hotels);
      }
    });


};

exports.create = (req, res) => {
  console.log('createNewHotel');
  const data = req.body;
  console.log(data);

  Hotel.create({
    name: data.name,
    stars: data.stars,
    address: data.address,
    city: data.city,
    state: data.state,
    country: data.country,
    zipcode: data.zipcode,
    reviews: data.reviews,
    rooms: data.rooms,
    imageUrl: data.imageUrl,
  }, function(err, newHotel){
    if(err){
      console.error(err);
    } else{
      res.json(newHotel);
    }
  });
};

exports.getAll = (req, res) => {
  Hotel
    .find({})
    .exec((err, results) => {
      console.log('getAll results=', results);
      if (err) res.json(err);
      res.json(results);
    });
};

exports.getOne = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  Hotel
    .findById(id)
    .exec((err, result) => {
      console.log('getOne result=', result);
      if (err) res.json(err);
      res.json(result);
    });
};

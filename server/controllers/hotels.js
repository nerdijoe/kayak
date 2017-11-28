const mongoose = require('mongoose');
const Hotel = require('../models/mongooseHotel');
// const HotelReview = require('../models/mongooseHotelReview');
// const HotelRoom = require('../models/mongooseHotelRoom');
const DBTool = require('../helpers/DBTool');

exports.edit = (req, res) => {
  console.log('edit hotel');
  const id = req.params.id;
  const data = req.body;

  Hotel.findByIdAndUpdate(
    id,
    {
      $set: {
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
      },
    },
    (err, result) => {
        if (err) res.json(err);
        Hotel
          .findById(id)
          .exec((err, result) => {
            console.log('getOne result=', result);
            if (err) res.json(err);
            res.json(result);
          });
    }
    );

};

exports.delete = (req, res) => {
  console.log("delete hotel");
  const id = req.params.id;
  const data = req.body;
  Hotel.findByIdAndUpdate(
    id,
    {
      $set: {
        isDelete: true,
      },
    },
    (err, result) => {
    if (err) res.json(false);
      res.json(true);
    }
    );
};

exports.search = (req, res) => {
  console.log('search hotel');
  const data = req.query;
  console.log(data);

  var city = data.city;
  console.log(city);

  var result = [];

  Hotel.find({city: DBTool.getCaseInsensitiveRegex(city)})
    .exec(function(err, hotels){
      if (err){
        console.error(err);
      } else{
        // console.log(hotels);
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

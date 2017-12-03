const mongoose = require('mongoose');
const Hotel = require('../models/mongooseHotel');
const HotelRoom = require('../models/mongooseHotelRoom');
const HotelReview = require('../models/mongooseHotelReview');
// const HotelReview = require('../models/mongooseHotelReview');
// const HotelRoom = require('../models/mongooseHotelRoom');
const DBTool = require('../helpers/DBTool');
const cache = require('../routes/redis/cache');
const redis_keyConstants = require('../routes/redis/keyConstants');
const redis_keyHelper = require('../routes/redis/keyHelper');

exports.editRooms = (req, res) => {
  console.log('hotel add room');
  const id = req.params.id;
  const data = req.body;

  // HotelRoom.create(data);

  Hotel.findByIdAndUpdate(
    id,
    {
      $set: {
        rooms: data.rooms,
      },
    },
    (err, result) => {
    if (err) res.json(err);
  Hotel
    .findById(id)
    .exec((err, result) => {
    console.log('add review result=', result);
  if (err) res.json(err);
  res.json(result);
});
});
};

exports.addReviews = (req, res) => {
  console.log('hotel add review');
  const id = req.params.id;
  const data = req.body;

  console.log(id);
  console.log(data);
  Hotel.findByIdAndUpdate(
    id,
    {
      $push: {reviews: data},
    },
    (err, result) => {
    if (err) res.json(err);
else{
    Hotel
      .findById(id)
      // .populate('reviews')
      .exec((err, result) => {
      console.log('add review result=', result);
    if (err) res.json(err);
    else res.json(result);
  });
  }
}
);
}
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
        roomType: data.roomType,
        price: data.price,
        // imageUrl: data.imageUrl,
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

  var redis_key = redis_keyHelper.generateKey(redis_keyConstants.SEARCH_HOTELS, req.query);
  cache.get(redis_key, function (reply) {
    if(reply){
      console.log("get data from Redis");
      res.json(JSON.parse(reply));
    } else{
      console.log("get data from database");
      Hotel.find({city: DBTool.getPartialRegex(city)})
        .exec(function(err, hotels){
          if (err){
            console.error(err);
          } else{
            // console.log(hotels);
            cache.set(redis_key, JSON.stringify(results));
            res.json(hotels);
          }
        });
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
    roomType: data.roomType,
    price: data.price,
    reviews: [],
    // imageUrl: data.imageUrl,
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
      // console.log('getAll results=', results);
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

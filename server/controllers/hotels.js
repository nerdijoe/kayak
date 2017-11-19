const mongoose = require('mongoose');
const Hotel = require('../models/mongooseHotel');
// const HotelReview = require('../models/mongooseHotelReview');
// const HotelRoom = require('../models/mongooseHotelRoom');

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

// exports.getAll = (req, res) => {
//   Car
//     .find({})
//     .populate('dealer')
//     .exec((err, results) => {
//       console.log('getAll results=', results);
//       if (err) res.json(err);
//       res.json(results);
//     });
// };
//
// exports.getOne = (req, res) => {
//   const id = mongoose.Types.ObjectId(req.params.id);
//
//   Car
//     .findById(id)
//     .populate('dealer')
//     .exec((err, result) => {
//       console.log('getOne result=', result);
//       if (err) res.json(err);
//       res.json(result);
//     });
// };

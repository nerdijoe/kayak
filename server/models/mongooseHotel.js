const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HotelReview = require('./mongooseHotelReview').schema;
const HotelRoom = require('./mongooseHotelRoom').schema;

const hotelSchema = new Schema({
  name: { type: String, required: true },
  stars: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipcode: { type: String, required: true },
  reviews: [HotelReview],
  rooms: [HotelRoom],
  imageUrl: { type: String, required: true },
  updatedAt: { type: Date, required: false, default: Date.now },
  createdAt: { type: Date, required: false, default: Date.now },
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;

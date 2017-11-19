const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hotelReviewSchema = new Schema({
  user: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  postedAt: { type: Date, required: false, default: Date.now },
});

const HotelReview = mongoose.model('HotelReview', hotelReviewSchema);

module.exports = HotelReview;

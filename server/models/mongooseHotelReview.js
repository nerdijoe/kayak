const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hotelReviewSchema = new Schema({
  user: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
}, {
  timestamps: true,
});

const HotelReview = mongoose.model('HotelReview', hotelReviewSchema);

module.exports = HotelReview;

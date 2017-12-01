const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hotelRoomSchema = new Schema({
  type: { type: String, required: true },
  description: { type: String, required: false},
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  // imageUrl: { type: String, required: true },
});

const HotelRoom = mongoose.model('HotelRoom', hotelRoomSchema);

module.exports = HotelRoom;
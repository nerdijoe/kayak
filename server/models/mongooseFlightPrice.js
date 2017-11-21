const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flightPriceSchema = new Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
});

const FlightPrice = mongoose.model('FlightPrice', flightPriceSchema);

module.exports = FlightPrice;

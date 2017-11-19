const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flightSchema = new Schema({
  flightNumber: { type: String, required: true },
  departureTime: { type: Date, required: false, default: Date.now },
  arrivalTime: { type: Date, required: false, default: Date.now },
  departureAirport: { type: Schema.Types.ObjectId, ref: 'FlightAirport' },
  arrivalAirport: { type: Schema.Types.ObjectId, ref: 'FlightAirport' },
  airline: { type: Schema.Types.ObjectId, ref: 'FlightAirline' },
  prices: [{ type: Schema.Types.ObjectId, ref: 'FlightPrice' }],
  createdAt: { type: Date, required: false, default: Date.now },
  updatedAt: { type: Date, required: false, default: Date.now },
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;

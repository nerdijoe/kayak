const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const FlightPrice = require('./mongooseFlightPrice').schema;

const flightSchema = new Schema({
  flightNumber: { type: String, required: true, unique: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  departureAirport: { type: Schema.Types.ObjectId, ref: 'FlightAirport' },
  arrivalAirport: { type: Schema.Types.ObjectId, ref: 'FlightAirport' },
  airline: { type: Schema.Types.ObjectId, ref: 'FlightAirline' },
  class: { type: String, required: true },
  price: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;

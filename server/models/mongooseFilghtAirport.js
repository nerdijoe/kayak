const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flightAirportSchema = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipcode: { type: String, required: true },
});

const FlightAirport = mongoose.model('FlightAirport', flightAirportSchema);

module.exports = FlightAirport;

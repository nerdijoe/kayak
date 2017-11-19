const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flightAirlineSchema = new Schema({
  name: { type: String, required: true },
  logoUrl: { type: String, required: true },
});

const FlightAirline = mongoose.model('FlightAirline', flightAirlineSchema);

module.exports = FlightAirline;

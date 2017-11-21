const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flightAirlineSchema = new Schema({
  iata: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

const FlightAirline = mongoose.model('FlightAirline', flightAirlineSchema, 'airlines');

module.exports = FlightAirline;

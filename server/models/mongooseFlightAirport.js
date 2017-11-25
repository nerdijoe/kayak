const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flightAirportSchema = new Schema({
  iata: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  iso: { type: String, required: false },
  lat: { type: String, required: false },
  lon: { type: String, required: false },
  continent: { type: String, required: false },
  size: { type: String, required: false },
  status: { type: Number, required: false },
  type: { type: String, required: false },
});

const FlightAirport = mongoose.model('FlightAirport', flightAirportSchema, 'airports');

module.exports = FlightAirport;

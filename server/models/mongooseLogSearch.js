const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSearchSchema = new Schema({
  userId: { type: Number, required: true },
  type: { type: String, required: true },
  dealerCity: { type: String, default: '' },
  // airportA: { type: Schema.Types.ObjectId, ref: 'FlightAirport' },
  // airportB: { type: Schema.Types.ObjectId, ref: 'FlightAirport' },
  airportA: { type: String, default: '' },
  airportB: { type: String, default: '' },
  hotelCity: { type: String, default: '' },
  startDate: { type: Date },
  endDate: { type: Date },
  rooms: { type: Number, default: 0 },
  guests: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const Log = mongoose.model('LogSearch', logSearchSchema);

module.exports = Log;

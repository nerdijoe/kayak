const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billingFlightSchema = new Schema({
  userId: { type: Number, required: true },
  flight: { type: Schema.Types.ObjectId, ref: 'Flight', required: true },
  flightNumber: { type: String, default: '' },
  airline: { type: Schema.Types.ObjectId, ref: 'FlightAirline' },
  departureAirport: { type: Schema.Types.ObjectId, ref: 'FlightAirport' },
  arrivalAirport: { type: Schema.Types.ObjectId, ref: 'FlightAirport' },
  departureCity: { type: String, default: '' },
  departureCountry: { type: String, default: '' },
  arrivalCity: { type: String, default: '' },
  arrivalCountry: { type: String, default: '' },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  classBooked: { type: String, default: '' },
  priceBooked: { type: Number, required: true },
  qtyBooked: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  isCanceled: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const BillingFlight = mongoose.model('FlightBilling', billingFlightSchema);

module.exports = BillingFlight;

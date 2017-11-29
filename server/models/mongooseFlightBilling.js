const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billingFlightSchema = new Schema({
  userId: { type: Number, required: true },
  flight: { type: Schema.Types.ObjectId, ref: 'Flight', required: true },
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

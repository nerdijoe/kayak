const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billingFlightSchema = new Schema({
  details: [{
    type: Schema.Types.ObjectId,
    ref: 'Flight',
    required: true,
    default: [],
  }],
  totalAmount: { type: Number, required: true },
  userId: { type: Number, required: true },
  createdAt: { type: Date, required: false, default: Date.now },
  updatedAt: { type: Date, required: false, default: Date.now },
});

const BillingFlight = mongoose.model('BillingFlight', billingFlightSchema);

module.exports = BillingFlight;

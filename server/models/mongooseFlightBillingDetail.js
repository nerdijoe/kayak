const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billingFlightDetailSchema = new Schema({
  userId: { type: Number, required: true },
  flight: { type: Schema.Types.ObjectId, ref: 'Flight', required: true },
  typeBooked: { type: String, required: true },
  priceBooked: { type: Number, required: true },
  createdAt: { type: Date, required: false, default: Date.now },
  updatedAt: { type: Date, required: false, default: Date.now },
});

const BillingFlightDetail = mongoose.model('BillingFlightDetail', billingFlightDetailSchema);

module.exports = BillingFlightDetail;

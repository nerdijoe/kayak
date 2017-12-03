const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hotelBillingSchema = new Schema({
  userId: { type: Number, required: true },
  hotelName: { type: String, default: '' },
  hotelCity: { type: String, default: '' },
  hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  daysBooked: { type: Number, required: true },
  qtyBooked: { type: Number, required: true },
  priceBooked: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  isCanceled: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const HotelBilling = mongoose.model('HotelBilling', hotelBillingSchema);

module.exports = HotelBilling;

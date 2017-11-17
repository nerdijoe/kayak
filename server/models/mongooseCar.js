const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carSchema = new Schema({
  type: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  dealer: { type: Schema.Types.ObjectId, ref: 'Dealer' },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  doorNumber: { type: Number, required: true },
  capacity: { type: Number, required: true },
  createdAt: { type: Date, required: false, default: Date.now },
  updatedAt: { type: Date, required: false, default: Date.now },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;

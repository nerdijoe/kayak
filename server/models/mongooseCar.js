const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carSchema = new Schema({
  type: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  dealer: { type: Schema.Types.ObjectId, ref: 'CarDealer' },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  doorNumber: { type: Number, required: true },
  capacity: { type: Number, required: true },
}, {
  timestamps: true,
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;

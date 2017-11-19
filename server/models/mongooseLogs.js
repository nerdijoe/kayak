const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema({
  action: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, required: false, default: Date.now },
  updatedAt: { type: Date, required: false, default: Date.now },
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;

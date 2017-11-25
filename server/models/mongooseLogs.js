const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema({
  action: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;

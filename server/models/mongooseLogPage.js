const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logPageSchema = new Schema({
  url: { type: String, required: true },
  userId: { type: Number, required: true },
}, {
  timestamps: true,
});

const Log = mongoose.model('LogPage', logPageSchema);

module.exports = Log;

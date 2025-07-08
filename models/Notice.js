
const mongoose = require('mongoose');
const NoticeSchema = new mongoose.Schema({
  text: String,
  isPrivate: Boolean,
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Notice', NoticeSchema);

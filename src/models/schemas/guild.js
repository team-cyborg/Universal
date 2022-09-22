const mongoose = require('mongoose');

module.exports = mongoose.model('Guild', new mongoose.Schema({
      id: String,
      name: String,
      wl_users: [String],
      bl_users: [String],
}))
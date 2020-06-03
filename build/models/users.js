"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  createdPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'Posts'
  }]
});
var User = mongoose.model('Users', userSchema);
module.exports = User;
//# sourceMappingURL=users.js.map
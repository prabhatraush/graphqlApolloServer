"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }
});
var Post = mongoose.model('Posts', userSchema);
module.exports = Post;
//# sourceMappingURL=posts.js.map
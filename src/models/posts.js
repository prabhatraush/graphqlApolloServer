const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
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
          default: Date.now
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
  }
);

const Post = mongoose.model('Posts', userSchema);
module.exports = Post;

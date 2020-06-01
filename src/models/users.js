const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
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
        default: Date.now
    },
    createdPosts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    }
    ]
  }
);

const User = mongoose.model('Users', userSchema);
module.exports = User;

"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var contactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
var Contact = mongoose.model('ContactUs', contactSchema);
module.exports = Contact;
//# sourceMappingURL=contactus.js.map
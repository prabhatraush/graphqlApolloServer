import mongoose from "mongoose";
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
});

const Contact = mongoose.model('ContactUs', contactSchema);
module.exports = Contact;
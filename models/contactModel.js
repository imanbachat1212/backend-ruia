const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  company: {
    type: String,
    require: false,
  },
  message: {
    type: String,
    require: false,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;

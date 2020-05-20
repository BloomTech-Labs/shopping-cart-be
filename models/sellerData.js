const mongoose = require('mongoose');

const sellerDataSchema = mongoose.Schema({
  businessName: {
    type: String,
    required: false,
    trim: true,
  },
  ownerName: {
    type: String,
    required: false,
    trim: true,
  },
  address: {
    type: String,
    required: false,
    trim: true,
  },
  secondAddress: {
    type: String,
    required: false,
    trim: true,
  },
  city: {
    type: String,
    required: false,
    trim: true,
  },
  state: {
    type: String,
    required: false,
    trim: true,
  },
  zipcode: {
    type: Number,
    required: false,
    trim: true, // may not need because validated on FE?
  },
  hours: {
    type: String,
    required: false,
    trim: true,
  },
  curbHours: {
    type: String,
    required: false,
    trim: true,
  },
  logo: {
    type: String,
    required: false,
    trim: true,
  },
});

const sellerData = mongoose.model('sellerData', sellerDataSchema);

module.
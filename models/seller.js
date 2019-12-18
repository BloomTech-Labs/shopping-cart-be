const mongoose = require('mongoose')

const sellerSchema = mongoose.Schema({
  phone: {
    type: Number,
    required: true,
    unique: true,
    trim: true
  },
  password: { type: String, required: true },
  register_date: {
    type: Date,
    default: Date.now
  }
})
const Seller = mongoose.model('Seller', sellerSchema)
module.exports = Seller

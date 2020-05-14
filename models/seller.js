const mongoose = require('mongoose')
const crypto = require('crypto')

const sellerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    trim: true
  },
  password: { type: String, required: true },

  resetPasswordToken: {
    type: String,
    required: false
  },

  resetPasswordExpires: {
    type: Date,
    required: false
  },
  register_date: {
    type: Date,
    default: Date.now
  }
})

sellerSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordExpires = Date.now() + 3600000 // expires in an hour
}

const Seller = mongoose.model('seller', sellerSchema)
module.exports = Seller

const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'store',
    required: true
  },
  contents: {
    type: Array,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  agreed_price: {
    type: Number,
    required: true
  },
  checked_out: {
    type: Boolean,
    required: true
  },
  checkout_date: {
    type: Date,
    required: true
  },
  paid_amount: {
    type: Number,
    required: true
  }
})

const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart

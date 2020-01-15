const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'store',
    required: true
  },
  contents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required: true
    }
  ],
  total: {
    type: Number,
    required: true
  },
  agreedPrice: {
    type: Number
  },
  checkedOut: {
    type: Boolean,
    required: true,
    default: false
  },
  checkoutDate: {
    type: Date,
    default: Date.now
  },
  paidAmount: {
    type: Number
  }
})

const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart

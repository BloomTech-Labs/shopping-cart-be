const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'store',
    required: true
  },
  contents: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
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
  },
  email: {
    type: String,
    required: true
  },
  deliveryInfo: {
    type: 'String',
    required: true
  },
  lock: {
    type: Boolean,
    default: false
  },
  finalLock: {
    type: Boolean,
    default: false
  }
})

const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart

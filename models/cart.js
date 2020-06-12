const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "store",
    required: true,
  },
  contents: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      quantity: {
        type: Number,
        required: true,
      },
      chosenVariant: {
        option: {
          type: String,
        },
        price: {
          type: Number,
        },
      }
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  agreedPrice: {
    type: Number,
  },
  checkedOut: {
    type: Boolean,
    required: true,
    default: false,
  },
  checkoutDate: {
    type: Date,
  },
  paidAmount: {
    type: Number,
  },
  email: {
    type: String,
  },
  deliveryAddress: {
    type: String,
  },
  deliveryOrCollection: {
    type: String,
  },
  lock: {
    type: Boolean,
    default: false,
  },
  finalLock: {
    type: Boolean,
    default: false,
  },
  paymentPreference: {
    type: String,
  },
  currency: {
    type: String,
  },
})

const Cart = mongoose.model("cart", cartSchema)

module.exports = Cart

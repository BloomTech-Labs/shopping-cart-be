const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "store",
    required: true,
  },
  orderCreated: {
    type: Date,
    default: Date.now()
  },
  orderCompleted: {
    type: Date,
  },

  orderItem: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        // required: true
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
  
  orderStatus: {
    type: String,
  },
})

const Order = mongoose.model("order", orderSchema)

module.exports = Order

const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "store",
    required: true,
  },
  orderCreated: {
    type: Date,
    required: true,
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
      },
    },
  ],
  orderStatus: [
    {
      ready: {
        type: Boolean,
      },
      completed: {
        type: Boolean,
      },
    },
  ],
})

const Order = mongoose.model("order", orderSchema)

module.exports = Order

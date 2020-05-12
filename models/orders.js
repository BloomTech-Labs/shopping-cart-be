const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "store",
    required: true,
  },
  orderCreated: {
    type: Date,
  },
  OrderCompleted: {
    type: Date,
  },
  orderItem: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
      },
      quantity: {
        type: Number,
      },
    },
  ],
})

const Order = mongoose.model("order", orderSchema)

module.exports = Order

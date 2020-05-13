const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "store",
    required: true,
  },
  orderCreated: {
    type: Date,
    required:true
  },
  orderCompleted: {
    type: Date,
    required: true
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
  orderStatus: {
    type:Boolean,
    required:true
  }
})

const Order = mongoose.model("order", orderSchema)

module.exports = Order

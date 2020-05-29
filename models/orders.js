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
  orderCompleted: {
    type: Date,
  },
  
  orderItem: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
      },
      quantity: {
        type: Number,
        // required: true
      }
    }
  ],
  orderStatus: {
    type: Boolean,
  },
  orderCompleteness: {
    type: Boolean
  }
})

const Order = mongoose.model("order", orderSchema)

module.exports = Order

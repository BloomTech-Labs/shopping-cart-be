const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: false
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'store',
    required: true
  },
  images: [
    {
      type: String
    }
  ]
})

const Product = mongoose.model('product', productSchema)

module.exports = Product

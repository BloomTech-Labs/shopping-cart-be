const mongoose = require('mongoose')

const storeSchema = mongoose.Schema({
  ownerName: {
    type: String,
    required: true,
    trim: true
  },
  currency: { type: String, required: true },
  imageUrl: { type: String },
  storeName: { type: String, required: true, unique: true },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller'
  },
  register_date: {
    type: Date,
    default: Date.now
  }
})
const Store = mongoose.model('store', storeSchema)
module.exports = Store

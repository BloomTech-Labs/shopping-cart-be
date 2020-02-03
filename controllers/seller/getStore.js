const Store = require('../../models/store')
const Seller = require('../../models/seller')
const mongoose = require('mongoose')

async function getOneStore (req, res) {
  try {
    let seller = ''
    const sellerId = req.decodedToken ? req.decodedToken.sub : null
    const store_id = req.params.store_id ? req.params.store_id : null

    if (!mongoose.Types.ObjectId.isValid(store_id) && !sellerId) {
      return res
        .status(404)
        .json({ message: 'There is no store with that id' })
    }

    if (sellerId) {
      seller = await Seller.findById(sellerId)
    }

    const store = await Store.findOne(
      sellerId ? { seller: sellerId } : { _id: store_id }
    )

    if (!store) {
      return res.status(404).json({ message: 'No store found' })
    }
    const updatedStore = { ...store._doc, phone: seller.phone }
    return res.status(200).json(updatedStore)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

module.exports = getOneStore

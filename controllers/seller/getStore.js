const Store = require('../../models/store')
const mongoose = require('mongoose')

async function getOneStore (req, res) {
  try {
    const sellerId = req.decodedToken ? req.decodedToken.sub : null
    const store_id = req.params.store_id ? req.params.store_id : null

    if (!mongoose.Types.ObjectId.isValid(store_id) && !sellerId) {
      return res.status(404).json({ message: 'There is no store with that id' })
    }

    const store = await Store.findOne(sellerId ? { seller: sellerId } : { _id: store_id })

    if (!store) {
      return res.status(404).json({ message: 'No store found' })
    }
    return res.status(200).json(store)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

module.exports = getOneStore

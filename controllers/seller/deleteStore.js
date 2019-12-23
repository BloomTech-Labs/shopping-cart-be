const Store = require('../../models/store')

async function deleteStore (req, res) {
  const { store_id } = req.params
  const { sub: sellerId } = req.decodedToken
  try {
    const store = await Store.findById({ _id: store_id })
    if (!store) {
      return res.status(404).json({ message: 'No store was found' })
    } else if (String(store.seller) != String(sellerId)) {
      return res
        .status(400)
        .json({ message: 'You can only delete your own store' })
    }
    await Store.deleteOne({ _id: store_id })
    return res.status(200).json({ message: 'Store has been removed' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = deleteStore

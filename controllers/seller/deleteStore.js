const Store = require('../../models/store')
const Product = require('../../models/product')
async function deleteStore (req, res) {
  const { sub } = req.decodedToken
  try {
    const store = await Store.findOne({ seller: sub })
    if (!store) {
      return res
        .status(404)
        .json({ message: 'There is no store associated with this account' })
    }
    const storeId = store._id
    await Product.deleteMany({ storeId })
    await Store.deleteOne({ _id: storeId })
    return res.status(200).json({ message: `${store.storeName} store has been removed` })
    
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = deleteStore

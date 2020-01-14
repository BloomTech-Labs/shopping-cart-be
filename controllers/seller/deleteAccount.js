const Store = require('../../models/store')
const Product = require('../../models/product')
const Seller = require('../../models/seller')

async function deleteAccount (req, res) {
  const { sub } = req.decodedToken

  try {
    const seller = await Seller.findOne({ _id: sub })
    if (!seller) {
      return res
        .status(404)
        .json({ message: 'There is no user associated with this account' })
    }
    const store = await Store.findOne({ seller: sub })
    if (store) {
      await Product.deleteMany({ storeId: store._id })
      await Store.deleteOne({ seller: sub })
    }
    await Seller.deleteOne({ _id: sub })
    return res.status(200).json({ message: 'user account has been removed' })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = deleteAccount

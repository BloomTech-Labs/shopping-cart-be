const Product = require('../../models/product')
const Store = require('../../models/store')

async function deleteProduct (req, res) {
  const productId = req.params.product_id
  try {
    const store = await Store.findOne({ seller: req.decodedToken.sub })
    const product = await Product.findOne({
      _id: productId,
      storeId: store._id
    })
    if (!product) {
      return res.status(404).json({ message: 'No product was found' })
    }
    await Product.deleteOne({ _id: productId })
    return res.status(200).json({ message: 'Product has been removed' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = deleteProduct

const Product = require('../../models/product')

async function getProducts (req, res) {
  try {
    const products = await Product.find({ storeId: req.params.store_id })
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' })
    }
    return res.status(200).json(products)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

async function getOneProduct (req, res) {
  try {
    const product = await Product.findById(req.params.product_id)

    if (!product) {
      return res.status(404).json({ message: 'No product found' })
    }
    return res.status(200).json(product)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

module.exports = { getProducts, getOneProduct }

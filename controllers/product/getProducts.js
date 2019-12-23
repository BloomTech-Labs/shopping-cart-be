const Product = require('../../models/product')

async function getProducts (req, res) {
  try {
    const products = await Product.find()
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' })
    }
    res.status(200).json(products)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

module.exports = getProducts

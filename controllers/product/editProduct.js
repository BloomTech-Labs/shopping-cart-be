const Product = require('../../models/product')
const validateProductData = require('../../middleware/validateProductData')

async function editProduct (req, res) {
  const { errors, isValid } = validateProductData(req.body)
  const productId = req.params.product_id

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const newProductDetails = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock
  }

  try {
    const currentProduct = await Product.findById({ _id: productId })
    if (!currentProduct) {
      return res.status(404).json({ message: 'No product was found' })
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { $set: newProductDetails },
      { new: true }
    )
    res.status(200).json(updatedProduct)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

module.exports = editProduct

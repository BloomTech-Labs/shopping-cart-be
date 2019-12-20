const Product = require('../../models/product')
const validateProductInput = require('../../middleware/validateProductData')

async function addProduct (req, res) {
  const { errors, isValid } = validateProductInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  try {
    const storeId = req.params.storeId
    const product = req.body
    product.storeId = storeId
    const newProduct = new Product(product)
    const result = await newProduct.save()
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

module.exports = addProduct

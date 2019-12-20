const Product = require('../../models/product')

function getProducts(req, res) {
  Product.find()
    .then(products => {
      if (products.length === 0) {
        return res.status(404).json({ message: 'No products found' })
      }
      res.status(200).json(products)
    })
    .catch(err => console.log(err))
}

module.exports = getProducts

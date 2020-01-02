const addProduct = require('./addProduct')
const { getProducts, getOneProduct } = require('./getProducts')
const editProduct = require('./editProduct')
const deleteProduct = require('./deleteProduct')

module.exports = {
  addProduct,
  getProducts,
  getOneProduct,
  editProduct,
  deleteProduct
}

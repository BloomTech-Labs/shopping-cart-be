const router = require('express').Router()
const {
  addProduct,
  getProducts,
  getOneProduct,
  editProduct,
  deleteProduct
} = require('../controllers/product')
const authenticate = require('../middleware/authenticateMiddleware')

// @route POST api/store/products
// @desc  Add a new item to the store
// @access Private
router.post('/products', authenticate, addProduct)

// @route GET api/store/:store_id/products
// @desc Gett all products from store
// @access Public
router.get('/:store_id/products', getProducts)

// @route GET api/store/products/:product_id
// @desc Gett all products from store
// @access Public
router.get('/products/:product_id', getOneProduct)

// @route POST /api/store/products/:product_id
// @desc Edit a product
// @access Public
router.put('/products/:product_id', authenticate, editProduct)

// @route DELETE /api/store/products/:product_id
// @desc Delete a product
// @access Public
router.delete('/products/:product_id', authenticate, deleteProduct)

module.exports = router

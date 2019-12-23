const router = require('express').Router()
const {
  addProduct,
  getProducts,
  editProduct
} = require('../controllers/product')
const authenticate = require('../middleware/authenticateMiddleware')

// @route POST api/store/:storeId/products
// @desc  Add a new item to the store
// @access Private
router.post('/products/', authenticate, addProduct)

// @route GET api/store/products
// @desc Gett all products from store
// @access Public
router.get('/products', authenticate, getProducts)

// @route POST /api/store/products/:product_id
// @desc Login user
// @access Public
router.put('/products/:product_id', authenticate, editProduct)

module.exports = router

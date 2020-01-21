const router = require('express').Router()

const {
  addCart,
  editCart,
  getCart,
  approveCart,
  submitCart
} = require('../controllers/cart')
const authenticate = require('../middleware/authenticateMiddleware')
// @route POST api/store/:store_id/cart
// @desc  Add items to cart
// @access Public
router.post('/:store_id/cart', addCart)

// @route GET api/store/:store_id/cart
// @desc  Get items from cart
// @access Public
router.get('/:cart_id/', getCart)
router.get('/cart/:cart_id', getCart)

// @route PUT api/store/cart/:cart_id
// @desc  Add items to cart
// @access Public
router.put('/cart/:cart_id', editCart)

// @route POST api/store/:store_id/cart/submit
// @desc  submit final cart for approval
// @access Public
router.post('/:store_id/cart/submit', submitCart)

// @route PUT api/store/cart/:cart_id
router.put('/cart/:cart_id/approve', authenticate, approveCart)
module.exports = router

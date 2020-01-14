const router = require('express').Router()
const {
  addCart,
  editCart
} = require('../controllers/cart')

// @route POST api/store/:store_id/cart
// @desc  Add items to cart
// @access Public
router.post('/:store_id/cart', addCart)

// @route PUT api/store/:store_id/cart
// @desc  Add items to cart
// @access Public
router.put('/cart/:cart_id', editCart)

module.exports = router

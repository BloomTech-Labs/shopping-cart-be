const router = require('express').Router()
const { addCart, getCart } = require('../controllers/cart')

// @route POST api/store/:store_id/cart
// @desc  Add items to cart
// @access Public
router.post('/:store_id/cart', addCart)

// @route GET api/store/:store_id/
// @desc  Get items from cart
// @access Public
router.get('/:store_id/cart', getCart)

module.exports = router

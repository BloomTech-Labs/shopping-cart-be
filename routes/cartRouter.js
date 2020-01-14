const router = require('express').Router()
const {
  addCart
} = require('../controllers/cart')

// @route POST api/store/:store_id/cart
// @desc  Add items to cart
// @access Public
router.post('/:store_id/cart', addCart)

module.exports = router

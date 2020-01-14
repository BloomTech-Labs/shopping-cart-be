const router = require('express').Router()
const { getCartContents } = require('../controllers/cart')
const authenticate = require('../middleware/authenticateMiddleware')

// @route GET api/cart/:cart_id
// @desc Gett all contents from cart
// @access Public
router.get('/:cart_id', getCartContents)

module.exports = router

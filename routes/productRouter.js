const router = require('express').Router()
const { addProduct } = require('../controllers/product')
const authenticate = require('../middleware/authenticateMiddleware')

router.post('/:storeId/products/', authenticate, addProduct)

module.exports = router

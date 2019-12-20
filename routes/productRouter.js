const router = require('express').Router()
const { addProduct, getProducts } = require('../controllers/product')
const authenticate = require('../middleware/authenticateMiddleware')

router.post('/:storeId/products/', authenticate, addProduct)

router.get('/products', getProducts)

module.exports = router

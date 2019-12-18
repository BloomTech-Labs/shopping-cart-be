const router = require('express').Router()
const {addProduct} = require('../controllers/product')

router.post('/:storeId/products/', addProduct)

module.exports = router;
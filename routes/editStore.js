const router = require('express').Router()
const { editStore } = require('../controllers/seller/index')

// @route POST api/auth/seller/:seller_id/store/:store_id
// @desc Edit a seller's store
// @access Private
router.put('/register', editStoreController)

module.exports = router

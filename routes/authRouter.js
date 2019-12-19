const router = require('express').Router()
const sellerController = require('../controllers/seller/index')
const { editStore } = require('../controllers/seller/index')
const authentication = require('../middlewares/authentication')
// @route POST api/auth/register
// @desc Register new user
// @access Public
router.post('/register', sellerController.register)
router.post('/login', sellerController.login)

// @route POST api/auth/edit
// @desc Edit a seller's store
// @access Public
router.put('/stores', authentication, editStore)

module.exports = router

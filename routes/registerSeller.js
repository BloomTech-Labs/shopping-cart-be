const router = require('express').Router()
const sellerController = require('../controllers/seller/index')

// @route POST api/auth/register
// @desc Register new user
// @access Public
router.post('/register', sellerController.register)
router.post("/login", sellerController.login)

module.exports = router;

const router = require('express').Router()
const sellerController = require('../controllers/seller/index')

// @route POST api/auth/register
// @desc Register new user
// @access Public
router.post('/register', sellerController.register)

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', sellerController.login)

router.get('/', (req, res) => {
  res.render('reset', { title: 'Reset Password Form' })
})

router.post('/recover', sellerController.recover)

router.post(
  '/reset/:token',
  sellerController.resetPassword
)

module.exports = router

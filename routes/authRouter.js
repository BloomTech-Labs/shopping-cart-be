const router = require('express').Router()
const sellerController = require('../controllers/seller/index')
const { check } = require('express-validator')

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

router.get('/reset/:token', sellerController.reset)

router.post(
  '/reset/:token',
  [
    check('password')
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage('Must be at least 6 chars long'),
    check('confirmPassword', 'Passwords do not match').custom(
      (value, { req }) => value === req.body.password
    )
  ],
  sellerController.resetPassword
)

module.exports = router

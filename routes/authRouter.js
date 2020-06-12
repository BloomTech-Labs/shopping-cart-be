const router = require('express').Router();
const sellerController = require('../controllers/seller/index');
const authenticate = require('../middleware/authenticateMiddleware');

// @route POST api/auth/register
// @desc Register new user
// @access Public
router.post('/register', sellerController.register);

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', sellerController.login);

router.post('/recover', sellerController.recover);

router.post('/reset/:token', sellerController.resetPassword);

router.delete('/account', authenticate, sellerController.deleteAccount);

router.put('/phone', authenticate, sellerController.updateSeller);

module.exports = router;

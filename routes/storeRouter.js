const router = require('express').Router()
const storeController = require('../controllers/seller/index')
const authenticateMiddleware = require('../middleware/authenticateMiddleware')

// @route POST api/store
// @desc Register new store
// @access Private
router.post('/', authenticateMiddleware, storeController.createStore)

// @route PUT /api/store/edit
// @desc Edit a seller's store
// @access Private
router.put('/', authenticateMiddleware, storeController.editStore)

module.exports = router

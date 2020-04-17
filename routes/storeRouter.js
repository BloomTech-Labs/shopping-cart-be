const router = require('express').Router()
const storeController = require('../controllers/seller/index')
const authenticateMiddleware = require('../middleware/authenticateMiddleware')

// @route POST api/store
// @desc Register new store
// @access Private
router.post('/', authenticateMiddleware, storeController.createStore)

// @route PUT /api/store/
// @desc Edit a seller's store
// @access Private
router.put('/', authenticateMiddleware, storeController.editStore)

// @route DELETE /api/store/
// @desc Delete a seller's store
// @access Private
router.delete('/', authenticateMiddleware, storeController.deleteStore)

// @route GET /api/store/sales
// @desc Get sellers sales history
// @access Private
router.get('/sales', authenticateMiddleware, storeController.getSalesHistory)

// @route GET api/store/
// @desc Get store by seller_id from auth token
// @access Private
router.get('/', authenticateMiddleware, storeController.getStore)

// @route GET /api/store/:store_id
// @desc Get store by store_id from URL
// @access Public
router.get('/:store_id', storeController.getStore)

// @route PUT /api/store/:store_id/account
// @desc Get store by store_id from URL
// @access Public
router.put('/account', authenticateMiddleware, storeController.updateAccount)

module.exports = router

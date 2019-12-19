const router = require("express").Router();
const storeController = require("../controllers/seller/index");
const authenticateMiddleware = require("../middleware/authenticateMiddleware")
// @route POST api/auth/register
// @desc Register new store
// @access Private
router.post("/", authenticateMiddleware, storeController.createStore);

module.exports = router;

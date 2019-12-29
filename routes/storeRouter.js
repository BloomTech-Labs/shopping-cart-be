const router = require("express").Router();
const storeController = require("../controllers/seller/index");
const authenticateMiddleware = require("../middleware/authenticateMiddleware");

// @route POST api/store
// @desc Register new store
// @access Private
router.post("/", authenticateMiddleware, storeController.createStore);

// @route PUT /api/store/:store_id
// @desc Edit a seller's store
// @access Private
router.put("/:store_id", authenticateMiddleware, storeController.editStore);

// @route DELETE /api/store/:storeId
// @desc Delete a seller's store
// @access Private

router.delete(
  "/:store_id",
  authenticateMiddleware,
  storeController.deleteStore
);
// @route GET api/store/:store_id
// @desc Get store by id
// @access Private
router.get("/:store_id", storeController.getStore);

module.exports = router;

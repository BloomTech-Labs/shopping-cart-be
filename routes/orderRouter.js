const router = require("express").Router()
const { getOrders, getOneOrder } = require("../controllers/order/getOrders")
const addOrder = require("../controllers/order/addOrder")
const authenticate = require("../middleware/authenticateMiddleware")

router.get("/:store_id/order", getOrders)

router.get('/order/:order_id', getOneOrder)

router.post("/order", authenticate, addOrder)

module.exports = router

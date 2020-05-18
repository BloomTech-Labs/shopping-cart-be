const router = require("express").Router()
const { getOrders, getOneOrder } = require("../controllers/order/getOrders")
const addOrder = require("../controllers/order/addOrder")
const editOrder = require("../controllers/order/editOrder")
const deleteOrder = require("../controllers/order/deleteOrder")
const authenticate = require("../middleware/authenticateMiddleware")

router.get("/:store_id/order", getOrders)

router.get('/order/:order_id', getOneOrder)

router.post("/order", authenticate, addOrder)

router.put("/order/:order_id", authenticate, editOrder)

router.delete("/order/:order_id", authenticate, deleteOrder)

module.exports = router

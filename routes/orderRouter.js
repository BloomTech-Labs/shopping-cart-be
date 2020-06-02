const router = require("express").Router()
const { getOrders, getOneOrder } = require("../controllers/order/getOrders")
const addOrder = require("../controllers/order/addOrder")
const editOrder = require("../controllers/order/editOrder")
const editOrderProduct = require('../controllers/order/editOrderProduct')
const deleteOrder = require("../controllers/order/deleteOrder")
const deleteOrderProduct = require("../controllers/order/deleteOrderProduct")
const authenticate = require("../middleware/authenticateMiddleware")

router.get("/:store_id/order", getOrders)

router.get("/order/:order_id", getOneOrder)

router.post("/order", authenticate, addOrder)

router.put("/order/:order_id", authenticate, editOrder)

router.put('/:order_id/:orderItem_id', editOrderProduct)

router.delete("/order/:order_id", authenticate, deleteOrder)

router.delete("/:order_id/:orderItem_id", deleteOrderProduct)

module.exports = router

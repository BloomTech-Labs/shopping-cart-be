const Order = require("../../models/orders")

async function getOrders(req, res) {
  try {
    const orders = await Order.find({ storeId: req.params.store_id })
    if (orders.length === 0) {
      return res.status(404).json({ message: "No order found!" })
    }
    return res.json(orders)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

async function getOneOrder(req, res) {
  try {
    const order = await Order.findById(req.params.order_id).exec()
    if (!order) {
      return res.status(404).json({ message: "No order found!" })
    }
    return res.json(order)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

module.exports = { getOrders, getOneOrder }

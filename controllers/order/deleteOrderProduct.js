const Order = require("../../models/orders")

async function deleteOrderProduct(req, res) {
  const orderId = req.params.order_id
  try {
    const order = await Order.findOne({
      _id: orderId,
    })
    if (!order) {
      return res.status(404).json({ message: "No order was found" })
    }
    await Order.updateOne(
      { _id: orderId },
      { $pull: { orderItem: { _id: req.params.orderItem_id } } },
      { safe: true, multi: true }
    )

    return res.status(200).json({ message: "OrderItem has been removed" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = deleteOrderProduct

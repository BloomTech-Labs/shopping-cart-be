const Order = require("../../models/orders")

async function deleteOrder (req, res) {
    const orderId = req.params.order_id
    try {
      const order = await Order.findOne({
        _id: orderId,
      })
      if (!order) {
        return res.status(404).json({ message: 'No order was found' })
      }

      await Order.findByIdAndDelete({ _id: orderId }).exec()
      return res.status(200).json({ message: 'Order has been removed' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
  
  module.exports = deleteOrder
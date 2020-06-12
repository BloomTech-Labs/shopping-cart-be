const Order = require('../../models/orders')

async function editOrder(req, res) {
    
    const orderId = req.params.order_id

    const editOrderDetails = req.body
    

    try {
        const currendOrder = await Order.findById({_id : orderId})
        if(!currendOrder) {
            return res.status(404).json({ message: 'No order was found' })
        }
        const updatedOrder = await Order.findOneAndUpdate({_id : orderId}, {$set: editOrderDetails}, {new: true})
        return res.json(updatedOrder)
    } catch(err) {
        return res.status(500).json(err.message)
    }
}

module.exports = editOrder
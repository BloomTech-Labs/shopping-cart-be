const Order = require('../../models/orders')

async function editOrderProduct(req, res) {
    
    const orderId = req.params.order_id
 
    
    try {
        
        const currendOrder = await Order.findById({_id : orderId}).populate("orderItem.product").exec()
        
        if(!currendOrder) {
            return res.status(404).json({ message: 'No order was found' })
        }
        
        const updatedOrderProduct = await Order.update({"orderItem._id" : req.params.orderItem_id }, {$set: {
            'orderItem.$.product.$.name' : req.body.name,
            'orderItem.$.quantity' : req.body.quantity
        }}, {new: true})
        return res.json(updatedOrderProduct)
    } catch(err) {
        return res.status(500).json(err.message)
    }
}

module.exports = editOrderProduct
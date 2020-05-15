const Order = require("../../models/orders")
const validateOrderInput = require("../../middleware/validateOrderData")
const Store = require("../../models/store")

async function addOrder(req, res) {
  // validating order data
  const { errors, isValid } = validateOrderInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  
  try {
    const store = await Store.findOne({ seller: req.decodedToken.sub }).exec()
    if (!store) {
      return res
        .status(404)
        .json({ message: "There is no store associatedd with this account" })
    }
    const order = req.body
    order.storeId = store._id
    const newOrder = new Order(order)
    const result = await newOrder.save()
    return res.json(result)
  } catch (err) {
    res.json(err.message)
  }
}

module.exports = addOrder

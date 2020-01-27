const Cart = require('../../models/cart')
const { validateCartInput } = require('../../middleware/validateCartData')

async function approveCart (req, res) {
  const { errors, isValid } = validateCartInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const cartId = req.params.cart_id
  try {
    const cart = await Cart.findById({ _id: cartId })
    if (!cart) {
      return res.status(404).json({ message: 'This cart does not exist' })
    } else {
      // eslint-disable-next-line require-atomic-updates
      req.body.finalLock = true
      const updateCart = await Cart.findOneAndUpdate(
        { _id: cartId },
        { $set: req.body },
        { new: true }
      )
      return res.status(200).json(updateCart)
    }
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

module.exports = approveCart

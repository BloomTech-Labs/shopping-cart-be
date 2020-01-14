const Cart = require('../../models/cart')

async function getCartContents(req, res) {
  try {
    const cartContents = await Cart.find({ _id: req.params.cart_id })
    console.log(cartContents)
    if (!cartContents) {
      return res.status(404).json({ message: 'No cart found' })
    }
    return res.status(200).json({ cartContents })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

module.exports = getCartContents

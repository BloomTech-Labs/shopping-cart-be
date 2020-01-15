const Cart = require('../../models/cart')
const Store = require('../../models/store')
const Product = require('../../models/product')

async function getCart(req, res) {
  try {
    const cartId = req.params.cart_id
    const cart = await Cart.findById({ _id: cartId })
    if (!cart) {
      return res.status(404).json({ message: 'No cart found' })
    }

    const populatedCart = await Cart.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'contents',
          foreignField: '_id',
          as: 'productObjects'
        }
      }
    ])

    const storeCart = populatedCart.filter(
      item => String(item._id) === String(cartId)
    )

    res.status(200).json(storeCart)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

module.exports = getCart

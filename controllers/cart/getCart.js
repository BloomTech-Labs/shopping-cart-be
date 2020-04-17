const Cart = require('../../models/cart')

async function getCart (req, res) {
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
          localField: 'contents.product',
          foreignField: '_id',
          as: 'content'
        }
      }
    ])

    const storeCart = populatedCart.filter(
      item => String(item._id) === String(cartId)
    )[0]

    const copyOfContents = [...storeCart.contents]
    const details = []
    copyOfContents.forEach(item => {
      for (let i = 0; i < copyOfContents.length; i++) {
        if (String(item.product) == String(storeCart.content[i]._id)) {
          details.push({
            ...storeCart.content[i],
            ...item
          })
        }
      }
    })

    storeCart.details = details
    storeCart.contents.length = 0

    storeCart.contents = [...storeCart.details]
    delete storeCart.content
    delete storeCart.details

    res.status(200).json(storeCart)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

module.exports = getCart

const Cart = require('../../models/cart')
const Store = require('../../models/store')
const Product = require('../../models/product')

async function getCart(req, res) {
  try {
    const storeId = req.params.store_id
    const store = await Store.findById({ _id: storeId })
    if (!store) {
      return res.status(404).json({ message: 'No store found' })
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
      item => String(item.storeId) === String(storeId)
    )

    res.status(200).json(storeCart)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

module.exports = getCart

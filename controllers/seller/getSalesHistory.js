const Store = require('../../models/store')
const Cart = require('../../models/cart')
const Product = require('../../models/product')

async function getSalesHistory(req, res) {
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
          localField: 'contents.product',
          foreignField: '_id',
          as: 'contents'
        }
      }
    ])

    if (populatedCart.length === 0) {
      return res.status(404).json({ message: 'Cart is empty' })
    }

    // find store related to carts
    const salesHistory = populatedCart.filter(
      item =>
        String(item.storeId) === String(storeId) && item.checkedOut === true
    )

    // calculate total sales made
    const totalSales = salesHistory.reduce((acc, item) => item.total + acc, 0)

    return res.status(200).json({ totalSales, salesHistory })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

module.exports = getSalesHistory

const Store = require('../../models/store')
const Cart = require('../../models/cart')

async function getSalesHistory (req, res) {
  try {
    const seller = req.decodedToken.sub
    const store = await Store.findOne({ seller })

    if (!store) {
      return res.status(404).json({ message: 'No store found' })
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

    // find store related to carts
    const salesHistory = populatedCart.filter(
      item =>
        String(item.storeId) === String(store._id) && item.checkedOut === true
    )

    if (salesHistory.length === 0) {
      return res.status(404).json({ message: 'Cart is empty' })
    }

    const details = []
    salesHistory.forEach((item, idx) => {
      item.contents.forEach((x, index) => {
        if (String(x.product) === String(item.content[index]._id)) {
          details.push({
            ...item.content[index],
            quantity: x.quantity,
            checkoutDate: item.checkoutDate,
            paidAmount: item.paidAmount,
            paymentPreference: item.paymentPreference
          })
        }
      })
    })

    // calculate sales for the month
    const today = new Date()
    const monthSales = salesHistory.reduce((acc, item) => {
      const date = new Date(item.checkoutDate)
      if (today.getMonth() === date.getMonth()) {
        return acc + item.paidAmount
      }
    }, 0)

    // calculate total sales made
    const totalSales = salesHistory.reduce(
      (acc, item) => item.paidAmount + acc,
      0
    )

    return res.status(200).json({
      totalSales,
      transactionDetails: details,
      monthSales: monthSales || 0
    })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

module.exports = getSalesHistory

const Cart = require('../../models/cart')
const Store = require('../../models/store')
const Seller = require('../../models/seller')
const { validateCartInput } = require('../../middleware/validateCartData')
const baseUrl = require('../../helpers/baseUrl')

async function submitCart (req, res) {
  const { errors, isValid } = validateCartInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const id = req.params.store_id
  try {
    const store = await Store.findById({ _id: id })
    if (!store) {
      return res.status(404).json({ message: 'This store does not exist' })
    }
    const seller = await Seller.findById({ _id: store.seller })
    const cart = req.body
    cart.storeId = store._id
    cart.currency = store.currency
    const newCart = new Cart(cart)
    const result = await newCart.save()
    const cartId = result._id
    // link to FE route of buyers saved cart
    const link = `${baseUrl}/cart/${cartId}`

    const message = `Hello ${store.ownerName},
    I am making a purchase from your store: ${store.storeName} on the pure retail app.
    This is the link to my cart: ${link}`

    const text = message.split(' ').join('%20')
    return res.status(200).json({
      status: 'Cart has been successfully submitted',
      text,
      sellerPhone: seller.phone
    })
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

module.exports = submitCart

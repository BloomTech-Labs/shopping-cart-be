const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const Cart = require('../../models/cart')
const Store = require('../../models/store')
const validateCartInput = require('../../middleware/validateCartData')

async function addCart (req, res) {
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
    const cart = req.body
    cart.storeId = store._id
    const newCart = new Cart(cart)
    const result = await newCart.save()

    // to be changed to FE route this is just a placeholder
    const link = 'http://' + req.headers.host + '/api/store/cart/'

    const msg = {
      to: `${result.email}`,
      from: process.env.FROM_EMAIL,
      subject: 'Pure Retail email Notification for your Saved Cart',
      text: 'This link will lead you to your saved cart',
      html: `<strong><a href=${link}>Click this link to go to your saved cart.</a></strong>`
    }
    await sgMail.send(msg)
    res.status(200).json({
      status: 'A link to your saved cart has been sent to ' + result.email + '.',
      result
    })
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

module.exports = addCart

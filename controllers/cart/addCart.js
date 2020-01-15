const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
      return res
        .status(404)
        .json({ message: 'This store does not exist' })
    }

    const cart = req.body
    cart.storeId = store._id
    const newCart = new Cart(cart)
    const result = await newCart.save()

    console.log(result)


    //return res.status(200).json(result)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

module.exports = addCart

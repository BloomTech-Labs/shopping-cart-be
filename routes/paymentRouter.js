// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const router = require('express').Router()
const validatePaymentInput = require('../middleware/validatePaymentData')
const validatePaymentCompleteInput = require('../middleware/validatePaymentComleteData')
const Store = require('../models/store')
const Cart = require('../models/cart')

const stripe = require('stripe')(process.env.STRIPE_SECRET)

router.post('/charge', async (req, res) => {
  const { errors, isValid } = validatePaymentInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  try {
    const transaction = req.body
    const store = await Store.findById({ _id: transaction.storeId })
    const stripeId = store.stripeId
    let currency

    switch (store.currency) {
      case 'DOL':
        currency = 'usd'
        break
      case 'POU':
        currency = 'gbp'
        break
      case 'EUR':
        currency = 'eur'
        break
      case 'YEN':
        currency = 'jpy'
        break
      default:
        currency = 'usd'
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: transaction.amount * 100,
      currency: currency
    }
    , {
      stripeAccount: stripeId
    }
    )
    res.status(200).json({ paymentIntent: paymentIntent, stripeId })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put('/complete', async (req, res) => {
  const { errors, isValid } = validatePaymentCompleteInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  try {
    const { cartId, amount } = req.body
    const cart = await Cart.findById({ _id: cartId })
    if (!cart) {
      return res.status(404).json({ message: 'This cart does not exist' })
    } else {
      const payload = {
        paidAmount: amount / 100,
        checkedOut: true
      }
      const updatedCart = await Cart.findOneAndUpdate(
        { _id: cartId },
        { $set: payload },
        { new: true }
      )
      return res.status(200).json(updatedCart)
    }
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router

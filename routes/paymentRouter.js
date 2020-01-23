// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const router = require('express').Router()
const validatePaymentInput = require('../middleware/validatePaymentData')
const Store = require('../models/store')

const stripe = require('stripe')(process.env.STRIPE_SECRET)

router.post('/charge', async (req, res) => {
  const { errors, isValid } = validatePaymentInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  try {
    const transaction = req.body
    const store = await Store.findById({_id: transaction.storeId})
    let stripeId = store.stripeId
    let currency

    switch(store.currency) {
      case 'DOL':
        currency = 'usd'
        break;
      case 'POU':
        currency = 'gbp'
        break;
      case 'EUR':
        currency = 'eur'
        break;
      case 'YEN':
        currency = 'jpy'
        break;
      default:
        currency = 'usd'
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: transaction.amount,
      currency: currency
    }, {
      stripeAccount: stripeId,
    })
    res.status(200).json({ paymentIntent: paymentIntent })
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router

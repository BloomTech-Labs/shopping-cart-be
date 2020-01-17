// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const router = require('express').Router()
const validatePaymentInput = require('../middleware/validatePaymentData')

const stripe = require('stripe')(process.env.STRIPE_SECRET)

router.post('/charge', async (req, res) => {
  const { errors, isValid } = validatePaymentInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  try {
    const transaction = req.body
    const paymentIntent = await stripe.paymentIntents.create({
      amount: transaction.amount,
      currency: transaction.currency
    })
    res.status(200).json({ paymentIntent: paymentIntent })
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router

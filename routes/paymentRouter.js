// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const router = require('express').Router()

const stripe = require('stripe')(process.env.STRIPE_SECRET);

router.post('/charge', async (req,res) => {
    let transaction = req.body
    const paymentIntent = await stripe.paymentIntents.create({
        amount: transaction.amount,
        currency: transaction.currency || 'usd',
      });
    res.status(200).json({paymentIntent: paymentIntent})
})

module.exports = router
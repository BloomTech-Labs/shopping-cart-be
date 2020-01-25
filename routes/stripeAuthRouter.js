const router = require('express').Router()
const passport = require('passport')
const Store = require('../models/store')
const validateStripeAuthInput = require('../middleware/validateStripeAuthData')
const baseUrl = require('../helpers/baseUrl')

router.post('/', async (req, res) => {
  const { errors, isValid } = validateStripeAuthInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  try {
    const storeId = req.body.storeId
    await Store.findOneAndUpdate(
      { _id: storeId },
      { $set: { stripeId: process.env.STRIPE_HOLDER } },
      { new: true }
    )
    res.status(200).json({ message: 'success' })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get('/', passport.authenticate('stripe', { scope: 'read_write' }))

router.get('/callback',
  passport.authenticate('stripe', { failureRedirect: `${baseUrl}/account` }),
  async function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(`${baseUrl}/account`)
  })

module.exports = router

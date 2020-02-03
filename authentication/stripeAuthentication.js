const StripeStrategy = require('./stripeStrategy')
const Store = require('../models/store')

const stripeAuth = new StripeStrategy({
  clientID: process.env.STRIPE_CLIENT_ID,
  clientSecret: process.env.STRIPE_SECRET,
  callbackURL: 'https://shopping-cart-eu3.herokuapp.com/api/auth/stripe/callback'
},
async (accessToken, refreshToken, stripe_properties, done) => {
  const stripeId = stripe_properties.stripe_user_id
  if (stripeId) {
    await Store.findOneAndUpdate(
      { stripeId: process.env.STRIPE_HOLDER },
      { $set: { stripeId: stripeId } },
      { new: true }
    )
  } else {
    await Store.findOneAndUpdate(
      { stripeId: process.env.STRIPE_HOLDER },
      { $set: { stripeId: '' } },
      { new: true }
    )
  }
  return done(null)
}
)

module.exports = stripeAuth

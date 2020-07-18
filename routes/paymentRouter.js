// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const router = require('express').Router();
const stripeConfig = require('../config.stripe');
// const request = require('request');

const stripe = require('stripe')(stripeConfig.stripe.secretKey);
router.post('/create-payment-intent', async (req, res) => {
	const { price, clientID } = req.body;

	try {
		const paymentIntent = await stripe.paymentIntents.create(
			{
				payment_method_types: [ 'card' ],
				amount: price * 100,
				currency: 'usd'
			},
			{ stripeAccount: clientID }
		);

		res.status(200).send({
			amount: price,
			publishableKey: stripeConfig.stripe.publishableKey,
			clientSecret: paymentIntent.client_secret,
			metadata: { integration_check: 'accept_a_payment' }
		});
	} catch (error) {
		res.status(400).send({ message: 'payment intent error' }, error.message);
	}
});

module.exports = router;

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const router = require('express').Router();
const stripeConfig = require('../config.stripe');
// const request = require('request');

const stripe = require('stripe')(stripeConfig.stripe.secretKey);
router.post('/create-payment-intent', async (req, res) => {
	const { price, clientID } = req.body;

	if (!price || !clientID) {
		return res
			.status(422)
			.json({ message: 'Please provide the required information. Price or Client id is missing. ' });
	}

	await stripe.paymentIntents
		.create(
			{
				payment_method_types: [ 'card' ],
				amount: price * 100,
				currency: 'usd'
			},
			{ stripeAccount: clientID }
		)
		.then(function(paymentIntent) {
			try {
				res.status(200).send({
					amount: price,
					publishableKey: stripeConfig.stripe.publishableKey,
					clientSecret: paymentIntent.client_secret,
					metadata: { integration_check: 'accept_a_payment' }
				});
			} catch (error) {
				res.status(500).send({ error: error.message });
			}
		});
});

module.exports = router;

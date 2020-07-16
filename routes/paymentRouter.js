// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const router = require('express').Router();
const stripeConfig = require('../config.stripe');
const uuid = require('uuid');

const stripe = require('stripe')(stripeConfig.stripe.secretKey);
router.post('/create-payment-intent', async (req, res) => {
	try {
		const { price, pK } = req.body;

		const idempontencyKey = uuid();

		const paymentIntentActual = await stripe.paymentIntents.create(
			{
				amount: price,
				currency: 'usd'
			}
			// {
			// 	idempontencyKey: idempontencyKey
			// }
		);

		console.log('paymentIntent', paymentIntentActual);

		//sending publishable key and payment intent to the client.
		res.status(200).send({
			message: `Thank you for your payment of $${price}`,
			amount: price,
			publishableKey: pK,
			clientSecret: paymentIntentActual.clientSecret,
			metadata: { integration_check: 'accept_a_payment' }
		});
	} catch (error) {
		res.status(400).json({ message: 'Payment not processed' });
	}
});

module.exports = router;

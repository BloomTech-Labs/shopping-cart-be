// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const router = require('express').Router();
const stripeConfig = require('../config.stripe');
// const request = require('request');

const stripe = require('stripe')(stripeConfig.stripe.secretKey);
router.post('/create-payment-intent', async (req, res) => {
	const { price, clientID } = req.body;

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
});

// router.get('/secret', async (req, res) => {
// 	try {
// 		const intent = await request
// 			.post('http://localhost:4000/api/auth/stripe/create-payment-intent', {
// 				price: 200,
// 				pK:
// 					'pk_test_51H2QaEI7mI0b1hERa7Hl22aT19XHAfYGpa4IyaP6LUR2vN7Khvu8nCSJIRPXOSKXVN32XVlH7eE0CfvO21vANYrB008zayIxxO',
// 				stripeAccount: '123456'
// 			})
// 			.on('response', function(res) {
// 				console.log(res.paymentIntentActual1559155);
// 			});
// 		res.status(200).json({ client_secret: intent.clientSecret });
// 	} catch (error) {
// 		res.status(400).json({ message: 'No secret for you' });
// 	}
// });

module.exports = router;

const stripeConfig = require('../../config.stripe');
const stripe = require('stripe')(stripeConfig.stripe.secretKey);
const fetch = require('node-fetch');

const paymentIntent = async (req, res, next) => {
	const { amount, currency } = req.body;
	const allProducts = req.body.quantity;

	allProducts.reduce(function(product, price) {
		const amount = product * price;
		return amount;
	});

	try {
		//create a payment intent with amount and currency.
		const paymentIntentActual = await stripe.paymentIntent.create({
			amount: amount,
			currency: currency
		});

		//sending publishable key and payment intent to the client.
		res.status(200).send({
			publishableKey: stripeConfig.stripe.publishableKey,
			clientSecret: paymentIntentActual.clientSecret,
			metadata: { integration_check: 'accept_a_payment' }
		});
	} catch (error) {
		next(error);
	}
};

const getSecret = async (req, res, next) => {
	try {
		const intent = await fetch('http://localhost:4000/api/auth/stripe/create-payment-intent');
		res.status(200).json({ client_secret: intent.clientSecret });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	paymentIntent,
	getSecret
};

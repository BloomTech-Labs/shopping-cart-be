const fetch = require('node-fetch');

const paymentIntent = async (req, res, next) => {
	try {
		//create a payment intent with amount and currency.
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

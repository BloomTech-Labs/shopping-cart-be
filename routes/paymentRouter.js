// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const router = require('express').Router();
const stripeConfig = require('../config.stripe');

const stripe = require('stripe')(stripeConfig.stripe.secretKey);
router.post('/create-payment-intent', async (req, res) => {
	try {
		const { price, pK } = req.body;

		const paymentIntentActual = await stripe.paymentIntents.create({
			amount: price,
			currency: 'usd'
		});

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

router.put('/complete', async (req, res) => {
	try {
		const { cartId, amount } = req.body;
		const cart = await Cart.findById({ _id: cartId });
		if (!cart) {
			return res.status(404).json({ message: 'This cart does not exist' });
		}
		else {
			const payload = {
				paidAmount: amount / 100,
				checkedOut: true
			};
			const updatedCart = await Cart.findOneAndUpdate({ _id: cartId }, { $set: payload }, { new: true });
			return res.status(200).json(updatedCart);
		}
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;

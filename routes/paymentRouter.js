// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const router = require('express').Router();
const Order = require('../models/orders');

const stripeConfig = require('../config.stripe');

const stripe = require('stripe')(stripeConfig.stripe.secretKey);
router.post('/create-payment-intent', async (req, res) => {
	try {
		const { orderId } = req.body;
		const orders = await Order.findOne({ _id: orderId });

		let total = 0;
		orders.orderItem.forEach((item) => {
			const quantity = item.quantity;
			const price = item.chosenVariant.price;

			total += quantity * price;
		});

		const paymentIntentActual = await stripe.paymentIntents.create({
			amount: total * 100,
			currency: 'usd'
		});

		//sending publishable key and payment intent to the client.
		res.status(200).send({
			message: 'THIS WORKED',
			amount: `Thank you for your payment of $${total}`,
			publishableKey: stripeConfig.stripe.publishableKey,
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

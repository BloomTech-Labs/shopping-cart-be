const Seller = require('../../models/seller');

async function updateSellerStripe(req, res, next) {
	if (!req.headers.authorization) {
		return res.status(400).json({ message: 'No headers noted. ' });
	}
	if (!req.decodedToken) {
		return res.status(400).json({ message: 'No Token found' });
	}
	//test
	const { sub } = req.decodedToken;
	try {
		const findSeller = await Seller.findOne({ _id: sub });
		if (!findSeller) {
			return res.status(404).json({ message: 'No account was found!' });
		}
		else {
			const updateInfo = {
				access_token: req.body.access_token,
				refresh_token: req.body.refresh_token,
				stripe_publishable_key: req.body.stripe_publishable_key,
				stripe_user_id: req.body.stripe_user_id
			};
			const user = await Seller.findOneAndUpdate({ _id: sub }, { $set: updateInfo }, { new: true });
			return res
				.status(201)
				.json({ message: 'Success: Your Stripe info has been registered! Thank You! PS: Fuck CORS!' });
		}
	} catch (error) {
		next(error);
	}
}

module.exports = updateSellerStripe;

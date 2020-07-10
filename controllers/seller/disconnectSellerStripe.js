const Seller = require('../../models/seller');

const disconnectStripe = async (req, res, next) => {
	const { sub } = req.decodedToken;
	if (!sub) {
		return res.status(400).json({ message: 'Not Allowed. Please login first' });
	}
	try {
		const seller = await Seller.findOne({ _id: sub });
		if (!seller) {
			return res.status(404).json({ message: 'No seller was found' });
		}
		else {
			const user = await Seller.findOneAndUpdate({ _id: sub }, { $set: req.body }, { new: true });
			return res.status(200).json({ user });
		}
	} catch (error) {
		next(error);
	}
};

module.exports = disconnectStripe;

const Seller = require('../../models/seller');

const getSellerInfo = async (req, res) => {
	const { sub } = req.decodedToken;
	if (!sub) {
		return res.status(400).json({ message: 'Not Allowed. Please login first' });
	}
	try {
		const seller = await Seller.findOne({ _id: sub });
		if (!seller) {
			return res.status(404).json({ message: 'User does not exist' });
		}
		else {
			res.status(200).json(seller);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = getSellerInfo;

const Seller = require('../../models/seller');

async function updatePhone(req, res) {
	const { sub } = req.decodedToken;
	const { errors, isValid } = req.body;

	if (!isValid) {
		return res.status(400).json(errors);
	}

	//   find seller / store
	try {
		const { phone } = req.body;
		const findSeller = await Seller.findOne({ _id: sub });
		if (!findSeller) {
			return res.status(404).json({ message: 'No seller was found' });
		}
		else {
			const existingSeller = await Seller.findOne({ phone });
			if (existingSeller && existingSeller.phone !== findSeller.phone) {
				return res.status(400).json({ message: 'Phone number has been taken already' });
			}
			const user = await Seller.findOneAndUpdate({ _id: sub }, { $set: req.body }, { new: true });

			return res.status(200).json({
				user: {
					id: user.id,
					phone: user.phone
				}
			});
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

module.exports = updatePhone;

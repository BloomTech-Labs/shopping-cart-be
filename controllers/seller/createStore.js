const Store = require('../../models/store');

async function createStore(req, res) {
	const { businessName } = req.body;
	const { sub: sellerId } = req.decodedToken;

	try {
		const result = await Store.findOne({ seller: sellerId });

		if (result) {
			return res.status(400).json({ message: 'You can not create more than one store' });
		}
		else {
			const User = await Store.findOne({ businessName });
			if (User) {
				return res.status(400).json({ message: 'Store name already exists' });
			}
		}
		const newStore = new Store({
			businessName: req.body.businessName,
			seller: req.decodedToken.sub,
			ownerName: req.body.ownerName,
			address: req.body.address,
			secondAddress: req.body.secondAddress,
			city: req.body.city,
			state: req.body.state,
			zipcode: req.body.zipcode,
			hours: req.body.hours,
			curbHours: req.body.curbHours,
			logo: req.body.logo,
			color: req.body.color
		});
		const saved = await newStore.save();
		return res.status(201).json({
			saved
		});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
}

module.exports = createStore;

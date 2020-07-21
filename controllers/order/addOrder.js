const Order = require('../../models/orders');
const Store = require('../../models/store');

async function addOrder(req, res) {
	const storeId = req.params.storeID;
	console.log(storeId);
	try {
		const store = await Store.findOne({ _id: storeId });
		console.log(store);
		if (!store) {
			return res.status(404).json({ message: 'There is no store associated with this account' });
		}
		const order = req.body;
		order.storeId = store._id;
		const newOrder = new Order(order);
		const result = await newOrder.save();
		console.log(result);
		return res.json(result);
	} catch (err) {
		res.json(err.message);
	}
}

module.exports = addOrder;

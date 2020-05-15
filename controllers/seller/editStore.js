const Store = require('../../models/store');

const { validateEditInput } = require('../../middleware/validateEditInput');

async function editStore(req, res) {
	const { sub } = req.decodedToken;
	const { ownerName, currency, imageUrl, storeName, address } = req.body;

	//   find seller / store
	try {
		const findStore = await Store.findOne({ seller: sub });
		if (!findStore) {
			return res.status(404).json({ message: 'No store was found' });
		}
		else {
			const existingStoreName = await Store.findOne({ storeName });
			if (
				existingStoreName &&
				existingStoreName.storeName &&
				existingStoreName.storeName !== findStore.storeName
			) {
				return res.status(400).json({ message: 'Store Name has been taken already' });
			}
			const newStoreDetails = {
				ownerName,
				currency,
				imageUrl,
				storeName,
				address
			};
			const storeId = findStore._id;

			const updateStore = await Store.findOneAndUpdate(
				{ _id: storeId },
				{ $set: newStoreDetails },
				{ new: true }
			);
			return res.status(200).json(updateStore);
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

module.exports = editStore;

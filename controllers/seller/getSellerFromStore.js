const Seller = require('../../models/seller');
const Store = require('../../models/store');

const getSellerFromStore = async (req, res) => {
	try {
		const { storeId } = req.params;
		console.log('StoreID?', storeId);

		const store = await Store.findOne({ _id: storeId });
		console.log('Is there a store', store);

		const sellerId = store.seller;
		const seller = await Seller.findOne({ _id: sellerId });
		console.log('Seller?', seller);

		const sellerPK = seller.stripe_publishable_key;

		res.status(200).json(sellerPK);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = getSellerFromStore;

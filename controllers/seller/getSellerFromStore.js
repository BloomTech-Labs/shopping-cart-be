const Seller = require('../../models/seller');
const Store = require('../../models/store');

const getSellerFromStore = async (req, res) => {
	try {
		const { storeId } = req.params;
		const store = await Store.findOne({ _id: storeId });
		const sellerId = store.seller;
		const seller = await Seller.findOne({ _id: sellerId });
		const sellerStripeID = seller.stripe_user_id;
		res.status(200).json(sellerStripeID);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = getSellerFromStore;

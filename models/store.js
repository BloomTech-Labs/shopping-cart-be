const mongoose = require('mongoose');

//this is test commit for seller product creation branch. DELETE LATER
const storeSchema = mongoose.Schema({
	ownerName: {
		type: String,
		required: true,
		trim: true
	},
	currency: { type: String, required: true },
	imageUrl: { type: String },
	storeName: { type: String, required: true, unique: true },
	seller: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Seller'
	},
	address: { type: String, required: true },
	register_date: {
		type: Date,
		default: Date.now
	},
	stripeId: { type: String }
});
const Store = mongoose.model('store', storeSchema);
module.exports = Store;

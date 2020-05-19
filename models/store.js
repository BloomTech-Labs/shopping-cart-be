const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
	businessName: {
		type: String,
		required: true,
		trim: true
	},
	ownerName: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Seller'
	},
	address: {
		type: String,
		required: true,
		trim: true
	},
	secondAddress: {
		type: String,
		trim: true
	},
	city: { type: String },
	state: { type: String },
	zipCode: { type: Number },
	hours: { type: String },
	curbHours: { type: String },
	logo: { type: String },
	color: { type: String }
});

const Store = mongoose.model('store', storeSchema);
module.exports = Store;

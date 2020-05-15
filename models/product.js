const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	productName: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	images: [
		{
			type: String
		}
	],
	vairants: [
		{
			type: String
		}
	],

	storeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'store',
		required: true
	}
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;

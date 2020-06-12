const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	productName: { type: String, required: true, trim: true },
	price: { type: Number, required: true, trim: true },
	category: { type: String },
	description: { type: String },
	images: [ { type: String, required: true } ],
	variantName: { type: String },
	variantDetails: [
		{
			option: {
				type: String
			},
			price: {
				type: Number
			}
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

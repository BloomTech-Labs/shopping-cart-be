const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	productName: {
		type: String,
		require: true
	},
	price: {
		type: Number,
		required: true
	},
	category: {
		type: String,
		required: true,
		unique: false
	},
	description: {
		type: String
	},
	photos: [ { type: String } ],
	variants: [
		{
			variantName: {
				type: String
			},
			variantOption: {
				type: String
			},
			variantPrice: {
				type: Number
			}
		}
	],
	store: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Store'
	}
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;

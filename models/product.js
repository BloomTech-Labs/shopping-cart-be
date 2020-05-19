const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	productName: { type: String, required: true, trim: true },
	price: { type: String, required: true, trim: true },
	category: { type: String },
	description: { type: String, require: true },
	images: [ { type: String } ],
	variants: [ { type: String } ],
	storeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'store',
		required: true
	}
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;

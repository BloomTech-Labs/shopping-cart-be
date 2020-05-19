const Product = require('../../models/product');
const Store = require('../../models/store');
const validateProductInput = require('../../middleware/validateProductData');

async function addProduct(req, res) {
	const { errors, isValid } = validateProductInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	try {
		const store = await Store.findOne({ seller: req.decodedToken.sub });
		if (!store) {
			return res.status(404).json({ message: 'There is no store associated with this account' });
		}
		const product = req.body;
		product.storeId = store._id;
		const newProduct = new Product(product);
		const result = await newProduct.save();
		return res.status(200).json(result);
	} catch (err) {
		return res.status(500).json(err.message);
	}
}

module.exports = addProduct;

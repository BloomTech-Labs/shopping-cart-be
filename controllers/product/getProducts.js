const Product = require("../../models/product");
const Store = require("../../models/store");

async function getProducts(req, res) {
  try {
    const store = await Store.findOne({ seller: req.decodedToken.sub });

    const products = await Product.find({ storeId: store._id });
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
}

module.exports = getProducts;

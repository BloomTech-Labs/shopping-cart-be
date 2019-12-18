const Product = require('../../models/product')

async function addProduct(req,res){
    try{
        const storeId = req.params.storeId;
        const product = req.body;
        product.storeId = storeId
        let newProduct = new Product(product);
        let result = await newProduct.save();
        res.status(200).json(result)
    }
    catch(err){
        res.status(500).json(err.message)
    }
}

module.exports = addProduct
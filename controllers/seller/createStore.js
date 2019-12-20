const Store = require("../../models/store");
const {
  validateCreateStoreInput
} = require("../../middleware/validateCreateStoreData");

async function createStore(req, res) {
  const { storeName } = req.body;
  const { sub: sellerId } = req.decodedToken;

  const { errors, isValid } = validateCreateStoreInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const result = await Store.findOne({ seller: sellerId });

    if (result) {
      return res
        .status(400)
        .json({ message: "You can not create more than one store" });
    } else {
      const User = await Store.findOne({ storeName });
      if (User) {
        return res.status(400).json({ message: "Store name already exists" });
      }


      const newStore = new Store({
        ownerName: req.body.ownerName,
        currency: req.body.currency,
        imageUrl: req.body.imageUrl,
        storeName: req.body.storeName,
        seller: req.decodedToken.sub
      });
      const saved = await newStore.save();
      res.status(201).json({
        saved
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = createStore;

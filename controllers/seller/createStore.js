const Store = require("../../models/store")

async function createStore(req, res) {
  try {
    const result = await Store.findOne({ seller: req.decodedToken.sub })

    if (result) {
      return res
        .status(400)
        .json({ message: "You can not create more than one store" })
    } else {
      const User = await Store.findOne({ businessName: req.body.businessName })
      if (User) {
        return res.status(400).json({ message: "Store name already exists" })
      }
    }
	
    const newStore = new Store({
      businessName: req.body.businessName,
      businessInfo: req.body.businessInfo,
      seller: req.decodedToken.sub,
    })
    const saved = await newStore.save()
    return res.status(201).json({
      saved,
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = createStore

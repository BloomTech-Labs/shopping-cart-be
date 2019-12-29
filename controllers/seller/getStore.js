const Store = require("../../models/store");

async function getOneStore(req, res) {
  try {
    const store = await Store.findById(req.params.store_id);

    if (!store) {
      return res.status(404).json({ message: "No store found" });
    }
    return res.status(200).json(store);
  } catch (err) {
    return res.status(500).json(err.message);
  }
}

module.exports = getOneStore;

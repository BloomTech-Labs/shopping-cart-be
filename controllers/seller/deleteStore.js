const Store = require("../../models/store");

async function deleteStore(req, res) {
  const { sub } = req.decodedToken;
  try {
    const store = await Store.findOne({ seller: sub });
    if (!store) {
      return res
        .status(404)
        .json({ message: "There is no store associated with this account" });
    }
    const store_id = store["_id"];
    await Store.deleteOne({ _id:store_id });
 
    return res.status(200).json({ message: `${store.storeName} store has been removed`, store });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = deleteStore;

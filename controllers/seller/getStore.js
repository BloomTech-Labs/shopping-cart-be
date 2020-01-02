const Store = require('../../models/store')

async function getOneStore (req, res) {
  try {
    const { sub: sellerId } = req.decodedToken
    const store = await Store.findOne({ seller: sellerId })

    if (!store) {
      return res.status(404).json({ message: 'No store found' })
    }
    return res.status(200).json(store)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

module.exports = getOneStore

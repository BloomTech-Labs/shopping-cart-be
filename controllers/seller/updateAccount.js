const Store = require('../../models/store')

const {
  validateAccountDetails
} = require('../../middleware/validateCreateStoreData')

async function updateAccount (req, res) {
  const { sub } = req.decodedToken
  const { errors, isValid } = validateAccountDetails(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  //   find seller / store
  try {
    const findStore = await Store.findOne({ seller: sub })
    if (!findStore) {
      return res.status(404).json({ message: 'No store was found' })
    } else {
      const storeId = findStore._id
      const updateStore = await Store.findOneAndUpdate(
        { _id: storeId },
        { $set: req.body },
        { new: true }
      )
      return res.json(updateStore)
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = updateAccount

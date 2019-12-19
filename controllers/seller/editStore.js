const Store = require('../../models/store')

const { validateEditInput } = require('../../middleware/validateEditInput')

function editStore(req, res) {
  const { sub: sellerId } = req.decodedToken
  const { errors, isValid } = validateEditInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const { ownerName, currency, imageUrl, storeName } = req.body

  //   find seller / store
  Store.findOne({ seller: sellerId })
    .then(store => {
      if (!store) {
        return res.status(404).json({ message: 'No store was found' })
      }

      const newStoreDetails = {
        ownerName,
        currency,
        imageUrl,
        storeName
      }

      Store.findOneAndUpdate(sellerId, { $set: newStoreDetails }, { new: true })
        .then(newStore => {
          res.json(newStore)
        })
        .catch(err => console.log(err))
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = editStore

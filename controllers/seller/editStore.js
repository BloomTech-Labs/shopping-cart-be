const Store = require('../../models/store')

const { validateEditInput } = require('../../middleware/validateEditInput')

function editStore(req, res) {
  const { sub: sellerId } = req.decodedToken
  const { store_id } = req.params
  const { errors, isValid } = validateEditInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const { ownerName, currency, imageUrl, storeName } = req.body

  //   find seller / store
  Store.findById({ _id: store_id })
    .then(store => {
      if (!store) {
        return res.status(404).json({ message: 'No store was found' })
      } else if (String(store.seller) != String(sellerId)) {
        return res
          .status(400)
          .json({ message: 'You can only modify your own store' })
      }

      const newStoreDetails = {
        ownerName,
        currency,
        imageUrl,
        storeName
      }

      Store.findOneAndUpdate(
        { _id: store_id },
        { $set: newStoreDetails },
        { new: true }
      )
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

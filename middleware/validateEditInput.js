const Validator = require('validator')
const isEmpty = require('is-empty')

function validateEditInput (data) {
  const errors = {}

  // Convert empty fields to an empty string so we can use validator functions
  data.ownerName = !isEmpty(data.ownerName) ? data.ownerName : ''
  data.currency = !isEmpty(data.currency) ? data.currency : ''
  data.storeName = !isEmpty(data.storeName) ? data.storeName : ''
  data.address = !isEmpty(data.address) ? data.address : ''

  // Store owner checks
  if (Validator.isEmpty(data.ownerName)) {
    errors.ownerName = 'Name of store owner is required'
  }

  // Store currency checks
  if (Validator.isEmpty(data.currency)) {
    errors.currency = 'Store currency is required'
  }

  // Store imageURL check
  if (Validator.isEmpty(data.storeName)) {
    errors.storeName = 'Store name is required'
  }

  // Store address check
  if (Validator.isEmpty(data.address)) {
    errors.address = 'Store address is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = { validateEditInput }

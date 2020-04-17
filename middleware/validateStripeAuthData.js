const isEmpty = require('is-empty')

function validateStripeAuthInput (data) {
  const errors = {}
  // Convert empty fields to an empty string so we can use validator functions
  let { storeId } = data
  storeId = storeId || ''

  // StoreId checks
  if (!storeId) {
    errors.storeId = 'storeId field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateStripeAuthInput

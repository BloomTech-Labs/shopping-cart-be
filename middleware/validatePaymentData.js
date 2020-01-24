const isEmpty = require('is-empty')

function validatePaymentInput (data) {
  const errors = {}
  // Convert empty fields to an empty string so we can use validator functions
  let { amount, storeId } = data
  amount = amount || ''
  storeId = storeId || ''

  // amount checks
  if (!amount) {
    errors.amount = 'amount field is required'
  } else if (isNaN(amount)) {
    errors.amount = 'amount must be a number'
  } else if (Number(amount) <= 0) {
    errors.amount = 'amount cant be less than 1'
  }

  // StoreId checks
  if (!storeId) {
    errors.storeId = 'storeId field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validatePaymentInput

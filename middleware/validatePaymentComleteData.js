const isEmpty = require('is-empty')

function validatePaymentCompleteInput (data) {
  const errors = {}
  // Convert empty fields to an empty string so we can use validator functions
  let { amount, cartId } = data
  amount = amount || ''
  cartId = cartId || ''

  // amount checks
  if (!amount) {
    errors.amount = 'amount field is required'
  } else if (isNaN(amount)) {
    errors.amount = 'amount must be a number'
  } else if (Number(amount) <= 0) {
    errors.amount = 'amount cant be less than 1'
  }

  // cartId checks
  if (!cartId) {
    errors.cartId = 'cartId field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validatePaymentCompleteInput

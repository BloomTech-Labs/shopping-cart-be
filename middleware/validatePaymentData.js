const isEmpty = require('is-empty')

function validatePaymentInput (data) {
  const errors = {}
  // Convert empty fields to an empty string so we can use validator functions
  let { amount, currency} = data
  amount = amount || ''
  currency = currency || ''

  // amount checks
  if (!amount) {
    errors.amount = 'amount field is required'
  } else if (isNaN(amount)) {
    errors.amount = 'amount must be a number'
  } else if (Number(amount) <= 0) {
    errors.amount = 'amount cant be less than 1'
  }

  // currency checks
  if (!currency) {
    errors.currency = 'crrency field is required'
  } else if (!isNaN(currency)) {
    errors.currency = 'currency cant be a number'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validatePaymentInput

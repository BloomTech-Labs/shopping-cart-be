const Validator = require('validator')
const isEmpty = require('is-empty')

function validatePasswordResetInput (data) {
  const errors = {}
  // Convert empty fields to an empty string so we can use validator functions
  data.password = !isEmpty(data.password) ? data.password : ''

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = { validatePasswordResetInput }

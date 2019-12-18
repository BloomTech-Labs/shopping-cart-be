const Validator = require('validator')
const isEmpty = require('is-empty')

function validateRegisterInput (data) {
  const errors = {}
  // Convert empty fields to an empty string so we can use validator functions
  data.phone = !isEmpty(data.phone) ? data.phone : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  // Phone Number checks
  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Phone Number field is required'
  } else if (!Validator.isMobilePhone(data.phone)) {
    errors.phone = 'Phone Number is invalid'
  }
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

function validateLoginInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Phone Number checks
  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone Number field is required";
  } else if (!Validator.isMobilePhone(data.phone)) {
    errors.phone = "Phone Number is invalid";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  } 
  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = {validateRegisterInput, validateLoginInput}

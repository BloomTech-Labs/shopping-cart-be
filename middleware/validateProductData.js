const Validator = require('validator')
const isEmpty = require('is-empty')

function validateProductInput (data) {
  const errors = {}
  // Convert empty fields to an empty string so we can use validator functions
  let {name, description, price, stock} = data
  name = !isEmpty(name) ? name : ''
  description = !isEmpty(description) ? description : ''
  price = !isEmpty(price) ? price : ''
  stock = !isEmpty(stock) ? stock : ''

  // Name checks
  if (Validator.isEmpty(name)) {
    errors.name = 'Name field is required'
  } 

  // description checks
  if (Validator.isEmpty(description)) {
    errors.description = 'Description field is required'
  }

  // price checks
  if (Validator.isEmpty(price)) {
    errors.price = 'Price field is required'
  } else if(Number(price) <= 0) {
      errors.price = 'Price cant be less than 0'
  }

  // stock checks
  if (Validator.isEmpty(stock)) {
    errors.stock = 'Stock field is required'
  } else if(Number(stock) <= 0) {
      errors.stock = 'Stock cant be less than 0'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateProductInput
const Validator = require('validator');
const isEmpty = require('is-empty');

function validateOrderInput(data) {
  const errors = {};

    let { orderCreated } = data

    orderCreated = orderCreated || ''

  if (Validator.isEmpty(orderCreated)) {
    errors.orderCreated = 'orderCreated field is required';
  }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateOrderInput;

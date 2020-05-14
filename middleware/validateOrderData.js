const Validator = require('validator');
const isEmpty = require('is-empty');

function validateOrderInput(data) {
  const errors = {};

  let { orderCreated, orderCompleted, orderStatus } = data;

  orderCreated = orderCreated || '';
  orderCompleted = orderCompleted || '';

  if (Validator.isEmpty(orderCreated)) {
    errors.orderCreated = 'orderCreated field is required';
  }

  if (Validator.isEmpty(orderCompleted)) {
    errors.orderCompleted = 'orderCompleted field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validateOrderInput;

const Validator = require('validator');
const isEmpty = require('is-empty');

function validateEditInput(data) {
	const errors = {};

	// Convert empty fields to an empty string so we can use validator functions
	data.businessName = !isEmpty(data.businessName) ? data.businessName : '';
	data.ownerName = !isEmpty(data.ownerName) ? data.ownerName : '';
	data.address = !isEmpty(data.address) ? data.address : '';
	data.secondAddress = !isEmpty(data.secondAddress) ? data.secondAddress : '';

	// Store imageURL check
	if (Validator.isEmpty(data.businessName)) {
		errors.businessName = 'Business name is required';
	}

	// Store owner checks
	if (Validator.isEmpty(data.ownerName)) {
		errors.ownerName = 'Name of store owner is required';
	}

	// Store address check
	if (Validator.isEmpty(data.address)) {
		errors.address = 'Store address is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
}

module.exports = { validateEditInput };

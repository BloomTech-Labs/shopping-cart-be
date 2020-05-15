const Validator = require('validator');
const isEmpty = require('is-empty');

function validateCreateStoreInput(data) {
	const errors = {};
	// Convert empty fields to an empty string so we can use validator functions
	data.businessName = !isEmpty(data.businessName) ? data.businessName : '';
	data.businessInfo = !isEmpty(data.businessInfo) ? data.businessInfo : '';

	// Store owner's name checks
	if (Validator.isEmpty(data.businessName)) {
		errors.businessName = 'Name of store owner is required';
	}
	else if (Validator.isEmpty(data.businessInfo)) {
		errors.businessInfo = 'Store businessInfo is required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
}

function validateAccountDetails(data) {
	const errors = {};
	data.stripeId = !isEmpty(data.stripeId) ? data.stripeId : '';
	if (Validator.isEmpty(data.stripeId)) {
		errors.stripeId = 'StripeId is required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
}

function validatePhone(data) {
	const errors = {};
	data.phone = !isEmpty(data.phone) ? data.phone : '';
	if (Validator.isEmpty(data.phone)) {
		errors.phone = 'phone is required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
}

module.exports = { validateCreateStoreInput, validateAccountDetails, validatePhone };

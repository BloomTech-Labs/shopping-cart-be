const Validator = require('validator');
const isEmpty = require('is-empty');

function validateProductInput(data) {
	const errors = {};
	// Convert empty fields to an empty string so we can use validator functions
	let { name, description, price, stock } = data;
	name = name || '';
	description = description || '';
	price = price || '';

	stock = stock || '';

	// Name checks
	if (Validator.isEmpty(name)) {
		errors.name = 'Name field is required';
	}

	// description checks
	if (Validator.isEmpty(description)) {
		errors.description = 'Description field is required';
	}

	// price checks
	if (!price) {
		errors.price = 'Price field is required';
	}
	else if (isNaN(price)) {
		errors.price = 'Price must be a number';
	}
	else if (Number(price) < 0) {
		errors.price = 'Price cant be less than 1';
	}

	// stock checks
	if (stock && isNaN(stock)) {
		errors.stock = 'Stock must be a number';
	}
	else if (stock && Number(stock) < 0) {
		errors.stock = 'Stock cant be less than 1';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
}

module.exports = validateProductInput;

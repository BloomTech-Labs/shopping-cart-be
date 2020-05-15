const Validator = require('validator');
const isEmpty = require('is-empty');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function validateRegisterInput(data) {
	const errors = {};
	// Convert empty fields to an empty string so we can use validator functions
	data.phone = !isEmpty(data.phone) ? data.phone : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	// Phone Number checks
	if (Validator.isEmpty(data.phone)) {
		errors.phone = 'Phone Number field is required';
	}
	else if (!Validator.isMobilePhone(data.phone)) {
		errors.phone = 'Phone Number is invalid';
	}
	// Password checks
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}
	else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
}

// validate phone number using TWILO API - DO NOT DELETE THIS CODE WILL BE EDITED ONCE TWILLIO
// async function validatePhoneNumber (req, res, next) {
//   try {
//     if (req.body.phone) {
//       await client.lookups.phoneNumbers(`+${req.body.phone}`).fetch().then((phone_number) => phone_number)
//     }
//     next()
//   } catch (e) {
//     return res.status(400).json({
//       phone: 'Phone Number is invalid, make sure you add your country calling code'
//     })
//   }
// }

function validateLoginInput(data) {
	const errors = {};
	// Convert empty fields to an empty string so we can use validator functions
	data.phone = !isEmpty(data.phone) ? data.phone : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	// Phone Number checks
	if (Validator.isEmpty(data.phone)) {
		errors.phone = 'Phone Number field is required';
	}
	else if (!Validator.isMobilePhone(data.phone)) {
		errors.phone = 'Phone Number is invalid';
	}
	// Password checks
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}
	else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
}

function validateRecoverPhone(data) {
	const errors = {};
	data.phone = !isEmpty(data.phone) ? data.phone : '';
	if (Validator.isEmpty(data.phone)) {
		errors.phone = 'Phone Number field is required';
	}
	else if (!Validator.isMobilePhone(data.phone)) {
		errors.phone = 'Phone Number is invalid';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
}

module.exports = {
	validateRegisterInput,
	validateLoginInput,
	validateRecoverPhone
};

const bcrypt = require('bcryptjs');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const Seller = require('../../models/seller');
const baseUrl = require('../../helpers/baseUrl');

const { validateRecoverPhone } = require('../../middleware/validateSellerData');
const { validatePasswordResetInput } = require('../../middleware/validatePasswordReset');

// ===PASSWORD RECOVER AND RESET

// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset phone
// @access Public

async function recover(req, res) {
	try {
		const { errors, isValid } = validateRecoverPhone(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		const seller = await Seller.findOne({ phone: req.body.phone });
		if (!seller) {
			return res.status(401).json({
				message:
					'The phone address ' +
					req.body.phone +
					' is not associated with any account. Double-check your phone address and try again.'
			});
		}
		else {
			// Generate and set password reset token
			seller.generatePasswordReset();
			try {
				const savedSeller = await seller.save();
				const link = `${baseUrl}/setnewpassword?token=${savedSeller.resetPasswordToken}`;

				const message = await client.messages.create({
					body: `Hi \n
               Please click on the following link ${link} to reset your password. \n\n
                        If you did not request this, please ignore this phone and your password will remain unchanged.\n`,
					from: process.env.TWILIO_NUMBER,
					to: `+${seller.phone}` // country code and number to be selected from FE
				});
				res.status(200).json({
					status: 'A reset phone has been sent to ' + seller.phone + '.',
					additional: message.body
				});
			} catch (error) {
				res.status(500).json({ message: error.message });
			}
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

// @route POST api/auth/reset
// @desc Reset Password
// @access Public

async function resetPassword(req, res) {
	try {
		const { errors, isValid } = validatePasswordResetInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}

		const seller = await Seller.findOne({
			resetPasswordToken: req.params.token,
			resetPasswordExpires: { $gt: Date.now() }
		});
		if (!seller) {
			return res.status(401).json({ message: 'Password reset token is invalid or has expired.' });
		}
		else {
			// Set the new password
			seller.password = req.body.password;
			seller.resetPasswordToken = undefined;
			seller.resetPasswordExpires = undefined;
			const hash = bcrypt.hashSync(seller.password);
			seller.password = hash;
			seller.save((error) => {
				if (error) {
					return res.status(500).json({ message: error.message });
				}
				else {
					res.status(200).json({ message: 'Your password has been updated.' });
				}
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
}

module.exports = { recover, resetPassword };

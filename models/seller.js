const mongoose = require('mongoose');
const crypto = require('crypto');

const sellerSchema = mongoose.Schema({
	phone: {
		type: Number,
		required: true,
		unique: true,
		trim: true
	},
	password: { type: String, required: true },

	access_token: { type: String },
	refresh_token: { type: String },
	stripe_publishable_key: { type: String },
	stripe_user_id: { type: String },

	resetPasswordToken: {
		type: String,
		required: false
	},

	resetPasswordExpires: {
		type: Date,
		required: false
	},
	register_date: {
		type: Date,
		default: Date.now
	}
});

sellerSchema.methods.generatePasswordReset = function() {
	this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
	this.resetPasswordExpires = Date.now() + 3600000; // expires in an hour
};

const Seller = mongoose.model('seller', sellerSchema);
module.exports = Seller;

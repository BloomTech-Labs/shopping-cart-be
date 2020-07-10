'use strict';
require('dotenv').config();

const config = require('../config.stripe');
// const stripe = require('stripe')(config.stripe.secretKey);
const request = require('request-promise-native');
const querystring = require('querystring');

const express = require('express');
const router = express.Router();

// * Redirect to Stripe to set up payments.

router.get('/authorize', async (req, res) => {
	var parameters = {
		client_id: config.stripe.clientId,
		state: req.session,
		scope: 'read_write'
	};

	parameters = Object.assign(parameters, { redirect_uri: 'http://localhost:4000/api/auth/stripe/token' });
	// console.log(`${config.stripe.authorizeUri}?${querystring.stringify(parameters)}`);
	res.redirect(`${config.stripe.authorizeUri}?${querystring.stringify(parameters)}`);
});

router.get('/token', async (req, res, next) => {
	try {
		//TODO: comment out if needed.
		// const { sub } = req.decodedToken;

		const tokenRequest = await request.post(config.stripe.tokenUri, {
			form: {
				grant_type: 'authorization_code',
				client_id: config.stripe.clientId,
				client_secret: config.stripe.secretKey,
				code: req.query.code
			},
			json: true
		});

		// const updateUser = await Seller.findOneAndUpdate({ _id: sub }, { $set: tokenRequest }, { new: true });
		return res.status(200).json({ tokenRequest });
	} catch (error) {
		console.log(`This does not work`);
		next(error);
	}
});

module.exports = router;

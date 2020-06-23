'use strict';
require('dotenv').config();

const config = require('../config.stripe');
const stripe = require('stripe')(config.stripe.secretKey);
const request = require('request-promise-native');
const querystring = require('querystring');

const express = require('express');
const router = express.Router();

// * Redirect to Stripe to set up payments.

router.get('/authorize', (req, res) => {
	const parameters = {
		client_id: config.stripe.clientId,
		scope: 'read_write'
	};
	console.log('STRIPE PARAMS', parameters);
	res.redirect(`${config.stripe.authorizeUri}?${querystring.stringify(parameters)}`);
});

module.exports = router;

require('dotenv').config();
('use strict');

module.exports = {
	appName: 'Pure Retail',

	publicDomain: 'http://localhost:4000',

	port: process.env.PORT,

	secret: process.env.FAKE_STRIPE_SECRET,

	stripe: {
		secretKey: process.env.FAKE_STRIPE_SECRET,
		publishableKey: process.env.FAKE_PUBLISHABLE_KEY,
		clientId: process.env.FAKE_STRIPE_CLIENT_ID,
		authorizeUri: process.env.STRIPE_AUTH_URI,
		tokenUri: process.env.STRIPE_TOKEN_URI
	},
	mongoUri: process.env.DB_CONNECTION || 'mongodb://localhost/shopping_cart'
};

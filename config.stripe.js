require('dotenv').config();
('use strict');

module.exports = {
	appName: 'Pure Retail',

	publicDomain: 'http://localhost:4000',

	port: process.env.PORT,

	secret: process.env.TEST_STRIPE_SECRET,

	stripe: {
		secretKey: process.env.TEST_STRIPE_SECRET,
		publishableKey: process.env.TEST_STRIPE_PUBLISHABLE_KEY,
		clientId: process.env.TEST_STRIPE_CLIENT_ID,
		authorizeUri: process.env.AUTHORIZE_URI,
		tokenUri: process.env.TOKEN_URI
	},
	mongoUri: process.env.DB_CONNECTION || 'mongodb://localhost/shopping_cart'
};

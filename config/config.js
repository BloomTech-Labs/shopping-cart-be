require('dotenv').config();

//test added new vars

const { NODE_ENV } = process.env;
let mongoURI = '';

if (NODE_ENV === 'test') {
	mongoURI = process.env.DB_CONNECTION_TEST || 'mongodb://localhost/shopping_cart_test';
}
else {
	mongoURI = process.env.DB_CONNECTION || 'mongodb://localhost/shopping-cart';
}

module.exports = mongoURI;

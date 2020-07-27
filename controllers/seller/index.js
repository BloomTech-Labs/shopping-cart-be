const register = require('./register');
const login = require('./login');
const editStore = require('./editStore');
const createStore = require('./createStore');
const deleteStore = require('./deleteStore');
const deleteAccount = require('./deleteAccount');
const { recover, resetPassword } = require('./passwordReset');
const getStore = require('./getStore');
const updateAccount = require('./updateAccount');
const getSalesHistory = require('./getSalesHistory');
const updateSeller = require('./updateSeller');
const updateSellerStripe = require('./updateSellerStripe');
const getSellerInfo = require('./getSellerInfo');
const disconnectStripe = require('./disconnectSellerStripe');
const getSellerFromStore = require('./getSellerFromStore');

module.exports = {
	register,
	login,
	editStore,
	createStore,
	deleteStore,
	recover,
	resetPassword,
	getStore,
	deleteAccount,
	updateAccount,
	getSalesHistory,
	updateSeller,
	updateSellerStripe,
	getSellerInfo,
	disconnectStripe,
	getSellerFromStore
};

const mongoose = require('mongoose');

//set the env
const env = process.env.NODE_ENV || 'development';

//Get the env from settings from config
const config = require('./config/mongo.json')[env];

module.exports = () => {
	const envURL = process.env[config.use_env_variable];

	const localUrl = `mongodb://${config.host}/${config.database}`;

	const mongoUrl = envUrl ? envUrl : localUrl;

	return mongoose.connect(mongoUrl);
};

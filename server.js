require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const mongoURI = require('./config/config');
const passport = require('passport');
const stripe = require('stripe')(process.env.STRIPE_SECRET, { apiVersion: '' });
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const stripeConfig = require('./config.stripe');
const authRouter = require('./routes/authRouter');
const productRouter = require('./routes/productRouter');
const storeRouter = require('./routes/storeRouter');
const cartRouter = require('./routes/cartRouter');
const paymentRouter = require('./routes/paymentRouter');
const stripeAuthRouter = require('./authentication/stripeStrategy');
const orderRouter = require('./routes/orderRouter');

const server = express();
server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(
	cors({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Methods': [ 'OPTIONS', 'GET', 'PUT', 'POST', 'DELETE' ]
	})
);

server.use('/api/auth', authRouter);
server.use('/api/store', productRouter);
server.use('/api/store', storeRouter);
server.use('/api/store', cartRouter);
server.use('/api/store', orderRouter);
server.use('/api/payment', paymentRouter);
server.use('/api/auth/stripe', stripeAuthRouter);

passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((user, done) => {
	done(null, user);
});

server.use(express.static(path.join(__dirname, 'public')));
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'pug');

mongoose
	.connect(
		mongoURI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		},
		console.log('MongoDB connected')
	)
	.catch((err) => console.log(err));

const sessionStore = new MongoStore({ mongooseConnection: mongoose.connection, collection: 'sessions' });
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(
	session({
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7
		},
		saveUninitialized: true,
		secret: stripeConfig.secret,
		signed: true,
		resave: false,
		store: sessionStore
	})
);

server.get('/', (req, res) => {
	res.status(200).send('Api is running!!');
});

server.all('*', (req, res) => {
	res.status(404).json({ message: 'This URL can not be found' });
});

module.exports = server;

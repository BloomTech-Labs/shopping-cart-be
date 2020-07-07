const cookieConfig = require('../server');
module.exports = (req, res, next) => {
	console.log('CookieMiddleware Above Try');
	try {
		console.log('CookieMiddleware Below Try');
		if (!req.headers.authorization) {
			return res.status(400).json({ message: 'Need to set headers!' });
		}

		const token = req.headers.authorization;
		console.log('Cookies Middleware Headers', req.headers.authorization);

		res.cookie('MINE', token, cookieConfig);

		console.log('Cookie Middleware Cookies');

		next();
	} catch (error) {
		next(error);
	}
};

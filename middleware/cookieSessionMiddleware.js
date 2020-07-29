const cookieConfig = require('../server');
module.exports = (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			return res.status(400).json({ message: 'Need to set headers!' });
		}

		const token = req.headers.authorization;

		res.cookie('MINE', token, cookieConfig);

		next();
	} catch (error) {
		next(error);
	}
};

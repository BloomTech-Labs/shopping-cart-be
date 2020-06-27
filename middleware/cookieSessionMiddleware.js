module.exports = (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			return res.status(400).json({ message: 'Need to set headers!' });
		}

		const token = req.headers.authorization;
		const expiration = 604800000;

		res.cookie('token', token, {
			expires: new Date(Date.now() + expiration),
			secure: false, // set to true if your using https
			httpOnly: true
		});

		next();
	} catch (error) {
		next(error);
	}
};

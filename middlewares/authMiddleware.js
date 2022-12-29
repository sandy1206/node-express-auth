const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
	const token = req.cookie.jwt;

	// check if jwt exists

	if (token) {
		const auth = jwt.verify(token, 'thisIsMySecrete', (err, decodedToken) => {
			if (err) {
				res.redirect('/login');
			}
			else {
				next();
			}
		})
	}
	else {
		res.redirect('/login');
	}
}

module.exports = requireAuth;

const User = require('../models/users');
module.exports.signup_get = (re, res) => {
	res.render('signup');
}

module.exports.login_get = (re, res) => {
	res.render('login');
}

module.exports.signup_post = async (re, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.create({
			email, password
		});

		res.status(201).json(user);
	}
	catch (err) {
		res.status(400).send('user not created');
	}
}

module.exports.login_post = (re, res) => {
	const { email, password } = req.body;
	res.send('new login');
}

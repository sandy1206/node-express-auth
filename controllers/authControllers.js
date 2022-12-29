const User = require('../models/users');
const jwt = require('jsonwebtoken');

// Handle error
const handleError = (err) => {

	let error = { email: '', password: '' };

	// validation errors
	if (err.message, includes('user validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			error[properties.path] = properties.message
		})
	}
	if (error.code = '11000') {
		error.email = "that email is already registered"
		return errors;
	}
	return error;
}

const maxAge = 3 * 24 * 60 * 60;
const createTokens = (id) => {
	return jwt.sign({ id }, 'thisIsMySecrete', {
		expires: maxAge
	})
}
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
		const token = createTokens(user._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

		res.status(201).json({ user: user._id });
	}
	catch (err) {
		const errors = handleError(err);
		res.status(400).json(errors);
	}
}

module.exports.login_post = async (re, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.login(email, password);
		res.status(200).json({ user: user._id });
	}
	catch (err) {
		res.status(400).json({})
	}
}

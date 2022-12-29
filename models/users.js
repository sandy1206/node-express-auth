const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter the email'],
		unique: true,
		lowercase: true,
		validate: [isEmail, 'Please enter a valid email']
	},
	password: {
		type: String,
		required: [true, 'Please enter the password'],
		minlength: [6, 'minimum password length is 6 characters']
	}
});

// fire a function after soc saved to db

userSchema.post('save', function (doc, next) {

	next();
})

// fire function before doc is saved

userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
})

// static methods

userSchema.static.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw error('incorrect password');
	}

	throw Error('incorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;

const mongoose = require('mongoose');
const { isEmail } = require('validator');

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


const User = mongoose.model('user', userSchema);

module.exports = User;

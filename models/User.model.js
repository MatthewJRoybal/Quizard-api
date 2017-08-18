const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		default: ""
	},
  lastName: {
		type: String,
		default: ""
	},
	gender: {
		type: String,
		default: "",
		enum: ["Wizard", "Witch"]
	}
});

const userModel = mongoose.model('User', UserSchema);

module.exports = {userModel};

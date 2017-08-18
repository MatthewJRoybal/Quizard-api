const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = new mongoose.Schema ({
  token: {
		type: String,
		required: true,
		unique: true
	},
  expiration: {
    type: Number,
    required: true,
    default: 8.64e+7 // 24hrs in milliseconds
  },
  created: {
    type: Number,
    required: true
  }
});

const sessionsModel = mongoose.model('Sessions', Schema);

module.exports = {sessionsModel};

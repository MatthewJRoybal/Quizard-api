const mongoose = require('mongoose');

const {userModel} = require('./User.model');

mongoose.Promise = global.Promise;

const ResultsSchema = new mongoose.Schema({
	user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel'},
	score: {
		type: Number,
		required: true
	},
	results: {
		type: Array,
		required: true
	},
	date: {
		type: Date,
		required: true
	}
});

const resultsModel = mongoose.model('Results', ResultsSchema);

module.exports = {resultsModel};
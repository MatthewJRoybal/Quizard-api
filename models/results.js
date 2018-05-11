const mongoose = require('mongoose');

const User = require('./user');

mongoose.Promise = global.Promise;

const ResultsSchema = new mongoose.Schema({
	owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
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

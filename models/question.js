const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const QuestionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	category: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	question: {
		type: String,
		required: true,
		unique: true
	},
	correct: {
		type: String,
		required: true
	},
	options: {
		type: Array,
		required: true
	}
});

const questionModel = mongoose.model('Question', QuestionSchema);

module.exports = {questionModel};
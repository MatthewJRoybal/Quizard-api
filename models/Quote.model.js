const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const QuoteSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true
	},
	story: {
		type: String,
		required: true
	},
	character: {
		type: String,
		required: true
	},
	quote: {
		type: String,
		required: true,
		unique: true
	}
});

const quoteModel = mongoose.model('Quote', QuoteSchema);

module.exports = {quoteModel};
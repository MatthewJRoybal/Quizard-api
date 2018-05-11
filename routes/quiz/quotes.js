const express 		= require('express');
const mongoose 		= require('mongoose');
const random			= require('mongoose-simple-random');
const bodyParser 	= require('body-parser');
const jsonParser 	= require('body-parser').json();

const {quoteModel} 		= require('../../models/quote');

const router = express.Router();
router.use(jsonParser);


router.get('/', function(req, res, err) {
	var count = Number(req.query.count);
	var promises = [];
	quoteModel.find().limit(count).skip(Math.floor(Math.random(count)))
		.then(function(data) {
			res.status(200).send(data);
		}).catch(function(err) {
			res.status(500).send(err);
			console.log("You got an error:" + err);
		});
});

router.post('/', function(req, res) {
	var newQuote = new quoteModel(req.body);
	newQuote.save().then(function(quote) {
		res.status(200).send(quote);
	}).catch(function(err) {
		res.status(500).send(err);
	})
});

module.exports = router;

const express 		= require('express');
const mongoose 		= require('mongoose');
const random			= require('mongoose-simple-random');
const bodyParser 	= require('body-parser');
const jsonParser 	= require('body-parser').json();

const {quoteModel} 		= require('../.././models/Quote.model'); 

const router = express.Router();

router.use(jsonParser);

/********************************************
 *************   GET QUOTES   ***************
 ********************************************/

router.get('/', function(req, res, err) {
	var count = Number(req.query.count);
	var promises = [];
	quoteModel.find().limit(count).skip(Math.floor(Math.random(count)))
		.then(function(data) { 
			res.status(200).send(data);
			console.log("You got your quotes!");
		}).catch(function(err) {
			res.status(500).send(err);
			console.log("You got an error:" + err);
		});
});

/********************************************
 *************   POST QUOTES   **************
 ********************************************/

router.post('/', function(req, res) {
	var newQuote = new quoteModel(req.body);
	newQuote.save().then(function(quote) {
		res.status(200).send(quote);
	}).catch(function(err) {
		res.status(500).send(err);
	})
});

// Why does this need to be exported?
module.exports = router;
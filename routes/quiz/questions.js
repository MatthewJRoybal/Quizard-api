const express 		= require('express');
const mongoose 		= require('mongoose');
const random			= require('mongoose-simple-random');
const bodyParser 	= require('body-parser');
const jsonParser 	= require('body-parser').json();
const passport = require('passport');
const router = express.Router();
router.use(jsonParser);

// Passport authentication strategy
const passportService = require('../../system/passport');
const protected = passport.authenticate('jwt', { session: false });

// Model
const {questionModel} = require('../../models/question');

/********************************************
 ************   GET QUESTIONS   *************
 ********************************************/

router.get('/', protected, function(req, res, err) {
	var promises = [];
	Object.keys(req.query).forEach(function(key) {
		promises.push(questionModel.find({category: key}).limit(Number(req.query[key])).skip(Math.floor(Math.random(questionModel.count()))));
	})
	Promise.all(promises).then(function(data) {
		var questions = [].concat.apply([], data);
		res.status(200).send(questions);
	}).catch(function(err) {
		res.status(500).send(err);
		console.log("You got an error:" + err);
	});
});

/********************************************
 ************   POST QUESTIONS   ************
 ********************************************/

router.post('/', function(req, res) {
	var newQuestion = new questionModel(req.body);
	newQuestion.save().then(function(question) {
		res.status(200).send(question);
	}).catch(function(err) {
		res.status(500).send(err);
	})
});

// Why does this need to be exported?
module.exports = router;

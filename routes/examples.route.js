const express 		= require('express');
const mongoose 		= require('mongoose');
const bodyParser 	= require('body-parser');
const jsonParser 	= require('body-parser').json();

const {questionsModel} = require('../.././models/Question.model');

const router = express.Router();

router.use(jsonParser);

/********************************************
 ************   POST QUESTION   *************
 ********************************************/

// Get all questions
router.get('/categories', function(req, res) {
	questionsModel.find({ }) // leaving empty pulls all data
		.then(function(questions) {
			res.status(200).send(questions);
			console.log(`Questions sent to client`);
		})
		.catch(function(err) {
			res.status(500).send(`Questions not sent to client, error: ${err}`);
		});
});

// Get
router.get('/:id', function(req, res) {
	questionsModel.find({ question });
		.then(function(question) {
			res.status(200).send(question);
			console.log(`Question ${question} sent to client`);
		})
		.catch(function(err) {
			res.status(500).send(`Questions not sent to client, error: ${err}`);
		})
});

// Post
router.post('/', function(req, res) {
	questionsModel.create(req.body)
		.then(function(question) {
			res.status(200).send(question);
			console.log(`Question ${question} sent to client`);
		})
		.catch(function(err) {
			res.status(500).send(`Questions not sent to client, error: ${err}`);
		})
});

// Update
router.put('/', function(req, res) {
	questionsModel.update({ question });
		.then(function(question) {
			res.status(200).send(question);
			console.log(`Question ${question} sent to client`);
		})
		.catch(function(err) {
			res.status(500).send(`Questions not sent to client, error: ${err}`);
		})
});

// Delete
router.delete('/', function(req, res) {
	questionsModel.delete({ question });
		.then(function(question) {
			res.status(200).send(question);
			console.log(`Question ${question} sent to client`);
		})
		.catch(function(err) {
			res.status(500).send(`Questions not sent to client, error: ${err}`);
		})
});

module.exports = router;
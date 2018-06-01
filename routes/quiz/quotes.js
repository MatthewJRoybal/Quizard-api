'use-strict';
/********************************************
 ***     API - ROUTES - QUIZ - QUOTES     ***
 ********************************************/

const mongoose = require('mongoose');
const router = require('express').Router();

// Passport authentication strategy
const passport = require('passport');
const passportService = require('../../system/passport');
const protected = passport.authenticate('jwt', { session: false });

// Model
const { quoteModel } = require('../../models/quote');

/*
  * GET QUOTES
  */

router.get('/', function(req, res, err) {
	var count = Number(req.query.count);
	var promises = [];
	quoteModel
		.find()
		.limit(count)
		.skip(Math.floor(Math.random(count)))
		.then(function(data) {
			res.status(200).send(data);
		})
		.catch(function(err) {
			res.status(500).send(err);
		});
});

/*
 * POST QUOTES
 */

router.post('/', function(req, res) {
	var newQuote = new quoteModel(req.body);
	newQuote
		.save()
		.then(function(quote) {
			res.status(200).send(quote);
		})
		.catch(function(err) {
			res.status(500).send(err);
		});
});

module.exports = router;

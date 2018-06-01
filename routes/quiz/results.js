'use-strict';
/********************************************
 ***    API - ROUTES - QUIZ - RESULTS     ***
 ********************************************/

const mongoose = require('mongoose');
const random = require('mongoose-simple-random');
const router = require('express').Router();

// Passport authentication strategy
const passport = require('passport');
const passportService = require('../../system/passport');
const protected = passport.authenticate('jwt', { session: false });

// Model
const { resultsModel } = require('../../models/results');
const User = require('../../models/user');

/*
 * GET RESULTS
 */

router.get('/', protected, function(req, res, err) {
	const owner = req.user._id;
	resultsModel
		.find({
			owner: owner
		})
		.then(function(data) {
			res.status(200).send(data);
		})
		.catch(function(err) {
			res.status(500).send(err);
		});
});

/*
 * POST RESULTS
 */

router.post('/', protected, function(req, res) {
	const resultsObj = Object.assign(req.body, { owner: req.user._id });
	var newResult = new resultsModel(resultsObj);
	newResult
		.save()
		.then(function(results) {
			res.status(200).send(results);
		})
		.catch(function(err) {
			res.status(500).send(err);
		});
});

module.exports = router;

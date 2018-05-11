const express 		= require('express');
const mongoose 		= require('mongoose');
const random			= require('mongoose-simple-random');
const bodyParser 	= require('body-parser');
const jsonParser 	= require('body-parser').json();
const passport = require('passport');

// Passport authentication strategy
const passportService = require('../../system/passport')
const protected = passport.authenticate('jwt', { session: false });

// Models
const {resultsModel} 		= require('../../models/results');
const User = require('../../models/user');

const router = express.Router();
router.use(jsonParser);


router.get('/', protected, function(req, res, err) {
  const owner = req.user._id;
	resultsModel.find({
    owner: owner
  })
		.then(function(data) {
			res.status(200).send(data);
			console.log("You got your results!", data);
		}).catch(function(err) {
			res.status(500).send(err);
			console.log("You got a results error:" + err);
		});
});

router.post('/', protected, function(req, res) {
  console.log('results req body:', req.body);
  const owner = req.user._id;
  req.body.user_id = req.user._doc._id;
  var newResult = new resultsModel(req.body);
	newResult.save()
		.then(function(results) {
			res.status(200).send(results);
		}).catch(function(err) {
      console.log('Your results are not posting correctly', err);
			res.status(500).send(err);
		})
});

module.exports = router;

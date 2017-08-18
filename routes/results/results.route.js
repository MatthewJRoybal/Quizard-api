const express 		= require('express');
const mongoose 		= require('mongoose');
const random			= require('mongoose-simple-random');
const bodyParser 	= require('body-parser');
const jsonParser 	= require('body-parser').json();
const protected   = require('../../system/protected');

const {resultsModel} 		= require('../.././models/Results.model');
const {userModel} 		= require('../.././models/User.model');

const router = express.Router();

router.use(jsonParser);

/********************************************
 *************   GET RESULTS   **************
 ********************************************/

router.get('/display', protected, function(req, res, err) {
  req.body.user_id = req.user._doc._id;
	resultsModel.find({
    user_id: req.body.user_id
  })	
		.then(function(data) { 
			res.status(200).send(data);
			console.log("You got your results!", data);
		}).catch(function(err) {
			res.status(500).send(err);
			console.log("You got an error:" + err);
		});
});

/********************************************
 *************   POST RESULTS   *************
 ********************************************/

router.post('/', protected, function(req, res) {
  req.body.user_id = req.user._doc._id;
  var newResult = new resultsModel(req.body);
	newResult.save() // Save the results of a quiz taken
		.then(function(results) {
			res.status(200).send(results);
		}).catch(function(err) {
      console.log(err);
			res.status(500).send(err);
		})
});

module.exports = router;
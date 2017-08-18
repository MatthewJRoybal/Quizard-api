const express 		= require('express');
const mongoose 		= require('mongoose');
const bodyParser 	= require('body-parser');
const jsonParser 	= require('body-parser').json();

const {userModel} = require('../.././models/User.model');
const security 		= require('../.././system/security');

const router 			= express.Router();

router.use(jsonParser);

/********************************************
 *************   CREATE USER   **************
 ********************************************/

router.post('/', function(req, res) { // Goes to --> /user/login
	security.hash(req.body.password) // Hash the password from request
		.then(function(hash) {
			req.body.password = hash; // Change request password to hash
			userModel.create(req.body) // Save request body with hashed password --> must match Schema to save
				.then(function(user) {
					res.status(200).send(user);
				})
				.catch(function(err) {
					res.status(500).send(`Couldn't save user, error: ${err}`);
				})
		})
		.catch(function(err) {
			res.status(500).send(`Couldn't create user, error: ${err}`);
		})
})

module.exports = router;
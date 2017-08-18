const express 	 = require('express');
const mongoose 	 = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = require('body-parser').json();

const {sessionsModel} = require('../.././models/Sessions.model');
const {userModel} 		= require('../.././models/User.model');
const security 				= require('../.././system/security');

const router = express.Router();

router.post('/', function(req, res) {
  userModel.findOne({username: req.body.username}) // Query setup
    .exec() // Execute query
    .then(function(user) { // If successful, callback user object
      security.compare(req.body.password, user.password)// Compare password with hash
        .then(function(compareResponse) { // If successful, callback response
				return sessionsModel.create({ // Create a session and return it
            token: security.sign(user), // Strip out sensitive data
            created: Date.now() // Log session for this date/time
          })
          .then(function(session) { // If successful, callback session
            console.log('user ' + user.username + ' has been logged in');
            return res.status(200).json(session);
						
          }).catch(function(err) { 
            res.status(500).send(`Server sessions error: ${err}`);
          })
        })
        .catch(function(err) { 
          res.status(401).send(`Password and hash don't match: ${err} `);
        })
      })
      .catch(function(err) { 
        res.status(401).send(`Username unverified/not found: ${err} `);
      })
  });

module.exports = router;
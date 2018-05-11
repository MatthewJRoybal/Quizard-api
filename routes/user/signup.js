'use-strict';
/***********************************************************
 * API - ROUTES - USER - SIGNUP.JS
 ***********************************************************/

const router = require('express').Router();

const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const { SECRET } = require('../../system/config');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.sign({ sub: user.id, iat: timestamp }, SECRET);
}

router.post('/', function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res
			.status(422)
			.send({ error: 'You must provide an email and password' });
	}

	User.findOne({ email: email }, (err, existingUser) => {
		if (err) {
			return next(err);
		}
		if (existingUser) {
			return res.status(422).send({ error: 'Email is in use' });
		}

		const user = new User({
			email: email,
			password: password
		});

		user.save(err => {
			if (err) {
				return next(err);
			}
			res.json({ token: tokenForUser(user) });
		});
	});
});

module.exports = router;

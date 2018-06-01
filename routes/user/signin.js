'use-strict';
/*************************************************
 * API - ROUTES - USER - SIGNIN.JS
 *************************************************/

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { SECRET } = require('../../system/config');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.sign({ sub: user.id, iat: timestamp }, SECRET);
}

router.post('/', function(req, res, next) {
	res.send({ token: tokenForUser(req.user) });
});

module.exports = router;

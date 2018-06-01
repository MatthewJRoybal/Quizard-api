'use-strict';
/*********************************************************
 * API - ROUTES - USER - INDEX.JS
 *********************************************************/

const router = require('express').Router();

// Passport authentication strategy
const passport = require('passport');
const passportService = require('../../system/passport');
const SigninCheck = passport.authenticate('local', { session: false });

router.use('/signup', require('./signup')); // New user
router.use('/signin', SigninCheck, require('./signin'));  // Login user

module.exports = router;

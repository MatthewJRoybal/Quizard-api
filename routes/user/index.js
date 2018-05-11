'use-strict';
/*********************************************************
 * API - ROUTES - USER - INDEX.JS
 *********************************************************/

 const passport = require('passport');
 const router = require('express').Router();
 const passportService = require('../../system/passport');

 // Passport authentication strategy
 const SigninCheck = passport.authenticate('local', { session: false });

router.use('/signup', require('./signup')); // New user
router.use('/signin', SigninCheck, require('./signin'));  // Login user

module.exports = router;

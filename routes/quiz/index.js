'use-strict';
/*********************************************************
 * API - ROUTES - QUIZ - INDEX.JS
 *********************************************************/

 const passport = require('passport');
 const router = require('express').Router();

 const passportService = require('../../system/passport');

 // Passport authentication strategy
 const protected = passport.authenticate('jwt', { session: false });

 router.use('/questions', require('./questions'));
 router.use('/quotes', require('./quotes'));
 router.use('/results', require('./results'));
// router.use('/questions', require('./questions'));
// router.use('/questions/get', protected, require('./questions')); // Get
// router.use('/results/post', protected, require('./results')); // Must be fixed
// router.use('/results/get', protected, require('./results')); // Must be fixed

module.exports = router;

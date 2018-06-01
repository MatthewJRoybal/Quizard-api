'use-strict';
/*********************************************************
 * API - ROUTES - QUIZ - INDEX.JS
 *********************************************************/

const router = require('express').Router();

router.use('/questions', require('./questions'));
router.use('/quotes', require('./quotes'));
router.use('/results', require('./results'));

module.exports = router;

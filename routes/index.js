'use-strict';
/*********************************************************
 * API - ROUTES - INDEX.JS
 *********************************************************/

const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/quiz', require('./quiz'));

module.exports = router;

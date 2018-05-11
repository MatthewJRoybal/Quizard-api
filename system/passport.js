'use-strict';
/******************************************************
 * API - SERVICES - PASSPORT.JS
 ******************************************************/

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

const { SECRET } = require('../system/config');

const localOptions = { usernameField: 'email' };
const localLogin = new localStrategy(localOptions, function(
	email,
	password,
	done
) {
	User.findOne({ email: email }, function(err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false);
		}
		user.comparePassword(password, function(err, isMatch) {
			if (err) {
				return done(err);
			}
			if (!isMatch) {
				return done(null, false);
			}
			return done(null, user);
		});
	});
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: SECRET,
	passReqToCallback: true
};

const jwtLogin = new JwtStrategy(jwtOptions, (req, payload, done) => {
	User.findById(payload.sub, (err, user) => {
		if (err) {
			return done(err, false);
		}
		if (user) {
			req.user = user;
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

passport.use(jwtLogin);
passport.use(localLogin);

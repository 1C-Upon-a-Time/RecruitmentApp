'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('mongoose').model('User');

module.exports = function () {
  // Use local strategy
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {
    User.findOne({
      email: email.toLowerCase()
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user || !user.authenticate(password)) {
        return done(null, false, {
          message: 'The email address or password you provided is not correct.'
        });
      }
      // Users with no privileges are not allowed to log in.
      // This avoids a potentially confusing 403 Forbidden error.
      if (user && user.authenticate(password) && user.roles.includes('none')) {
        return done(null, false, {
          message: 'Your account is disabled or has not yet been approved. Please contact an administrator to activate your account.'
        });
      }

      return done(null, user);
    });
  }));
};

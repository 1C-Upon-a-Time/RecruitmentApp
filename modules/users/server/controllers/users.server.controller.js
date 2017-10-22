'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
  require('./users/users.authentication.server.controller'),
  require('./users/users.authorization.server.controller'),
  require('./users/users.password.server.controller'),
  require('./users/users.profile.server.controller')
);
module.exports.register = function(req, res) {
  console.log("Registering user: " + req.body.email);
  res.status(200);
  res.json({
    "message" : "User registered: " + req.body.email
  });
};
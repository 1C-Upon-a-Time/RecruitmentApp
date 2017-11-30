'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  User = mongoose.model('User');

// URLs for which user can't be redirected on signin
exports.getRecruiters = function(req, res){
	// Make sure to only get specific fields so as not to get salt and password hash
	User.find({isRecruiter : "true"}, "displayName email profileImageURL interviews")
	.populate('interviews')
	.exec(function(err, recruiters) {
		if(err) {
			res.status(400).send(err);
		} else {
			res.json(recruiters);
		}
	});
};

exports.updateInterviews = function(req, res){
	var user = req.user;

	user.interviews = req.body.interviews;

	user.save(function(err) {
	    if(err) {
	      console.log(err);
	      res.status(400).send(err);
	    } else {
	      res.json(user);
	    }
  	});
};


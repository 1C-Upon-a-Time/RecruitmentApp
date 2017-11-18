/* Dependencies */

'use strict';
var mongoose = require('mongoose'),
  InterviewSlot = require('../models/calendar.server.interviewSlotModel.js');

  var path = require('path');
  var nodemailer = require('nodemailer');
  var config = require(path.resolve('./config/config'));
  var smtpTransport = nodemailer.createTransport(config.mailer.options);
  var sgTransport = require('nodemailer-sendgrid-transport');





/* Create an interviewSlot */
exports.create = function(req, res) {

  /* Instantiate a interviewSlot */
  var interviewSlot = new InterviewSlot(req.body);

  /* Then save the interviewSlot */
  interviewSlot.save(function(err) {

    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(interviewSlot);
    }
  });
};

/* Show the current interviewSlot */
exports.read = function(req, res) {
  /* send back the interviewSlot as json from the request */
  res.json(req.interviewSlot);
};

exports.update = function(req, res, done) {

  var interviewSlot = req.interviewSlot;

  interviewSlot.date = req.body.date;
  interviewSlot.slot = req.body.slot;
  interviewSlot.isAvailable = req.body.isAvailable;
  interviewSlot.student = req.body.student;
  interviewSlot.recruiter = req.body.recruiter;

  /* Save the article */
  interviewSlot.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(interviewSlot);
    }
  });
};

exports.sendEmail = function (res, req, done) {

      var mailOptions = {
        to: 'victoriajoyscott@gmail.com',
        from: config.mailer.from,
        subject: 'Interview Request',
        html: 'TEXT'
      };

      smtpTransport.sendMail(mailOptions, function (err) {
        if (!err) {
          console.log('An email has been sent');
          }
         else {
          console.log('Failure sending email');
          }
          done(err);
        });
      };

/* Delete a interviewSlot */
exports.delete = function(req, res) {
  var interviewSlot = req.interviewSlot;

  /* Remove the article */
  interviewSlot.remove(function(err) {
    if(err) {
      res.status(400).send(err);
    }
    else {
      res.end();
    }
  });
};

/* Retreive all the directory interviewSlots */
exports.list = function(req, res) {
  InterviewSlot.find()
  .populate('student')
  .populate('recruiter')
  .exec(function(err, interviewSlots) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.json(interviewSlots);
    }
  });
};

/*
  Middleware: find a interviewSlot by its ID, then pass it to the next request handler.

 */
exports.interviewByID = function(req, res, next, id) {
  var interviewSlot = req.interviewSlot;
  InterviewSlot.findById(id)
  .populate('student')
  .populate('recruiter')
  .exec(function(err, interviewSlot) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.interviewSlot = interviewSlot;
      next();
    }
  });
};

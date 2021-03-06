/* Dependencies */

'use strict';

var path = require('path'),
  InterviewSlot = require('../models/calendar.server.interviewSlotModel.js'),
  config = require(path.resolve('./config/config')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  nodemailer = require('nodemailer'),
  async = require('async');

var smtpTransport = nodemailer.createTransport(config.mailer.options);

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

exports.bulkCreate = function(req, res) {
  var slotsList = req.body;

  InterviewSlot.collection.insert(slotsList, function(err, docs){
    if (err)
      return err;
  });
};

/* Show the current interviewSlot */
exports.read = function(req, res) {
  /* send back the interviewSlot as json from the request */
  res.json(req.interviewSlot);
};

exports.update = function(req, res) {
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

exports.sendInvite = function (req, res) {
  var data = req.body;

  smtpTransport.sendMail({
        from: config.mailer.from,
        to: data.email,
        subject: data.subject,
        text: data.body
    });
 
    res.json(data);
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
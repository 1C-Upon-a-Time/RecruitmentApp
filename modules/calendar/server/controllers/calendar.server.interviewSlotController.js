/* Dependencies */

"use strict";
var mongoose = require('mongoose'), 
  InterviewSlot = require('../models/calendar.server.interviewSlotModel.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update interviewSlots.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the interviewSlot(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial 
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

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

/* Retreive all the directory interviewSlots, sorted alphabetically by interviewSlot code */
exports.list = function(req, res) {
  InterviewSlot.find().exec(function(err, interviewSlots) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.json(interviewSlots);
    }
  });
};

/* 
  Middleware: find a interviewSlot by its ID, then pass it to the next request handler. 

  HINT: Find the interviewSlot using a mongoose query, 
        bind it to the request object as the property 'interviewSlot', 
        then finally call next
 */
exports.interviewSlotByID = function(req, res, next, id) {
  var interviewSlot = req.interviewSlot;
  InterviewSlot.findById(id).exec(function(err, interviewSlot) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.interviewSlot = interviewSlot;
      next();
    }
  });
};
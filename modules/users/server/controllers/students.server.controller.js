/* Dependencies */

"use strict";
var mongoose = require('mongoose'), 
  Student = require('../models/students.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update students.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the student(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial 
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a student */
exports.create = function(req, res) {

  /* Instantiate a student */
  var student = new Student(req.body);



  /* Then save the student */
  student.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(student);
    }
  });
};

/* Show the current student */
exports.read = function(req, res) {
  /* send back the student as json from the request */
  res.json(req.student);
};



  
/* Delete a student */
exports.delete = function(req, res) {
  var student = req.student;

  /* Remove the article */
  student.remove(function(err) {
    if(err) {
      res.status(400).send(err);
    }
    else {
      res.end();
    }
  });
};

/* Retreive all the directory students, sorted alphabetically by student code */
exports.list = function(req, res) {
  Student.find().exec(function(err, students) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.json(students);
    }
  });
};

/* 
  Middleware: find a student by its ID, then pass it to the next request handler. 

  HINT: Find the student using a mongoose query, 
        bind it to the request object as the property 'student', 
        then finally call next
 */
exports.studentByID = function(req, res, next, id) {
  var student = req.student;
  Student.findById(id).exec(function(err, student) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.student = student;
      next();
    }
  });
};
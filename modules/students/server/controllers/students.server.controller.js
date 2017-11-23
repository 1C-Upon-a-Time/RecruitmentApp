/* Dependencies */

"use strict";
  var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    multer = require('multer'),
    config = require(path.resolve('./config/config')),
    Student = mongoose.model('Student');

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
exports.read = function (req, res) {
  res.json(req.student);
};

exports.update = function(req, res) {
  var student = req.student;

  /* Replace the article's properties with the new properties found in req.body */
  student.name = req.body.name;
  student.email = req.body.email;
  student.major = req.body.major;
  student.minor = req.body.minor;
  student.phone = req.body.phone;
  student.gpa = req.body.gpa;
  student.fulltime = req.body.fulltime;
  student.interview = req.body.interview;
  student.season = req.body.season;

  /* save the coordinates (located in req.results if there is an address property) */
  if(req.body.recruiterComments) {
      student.recruiterComments.comments = req.body.recruiterComments.comments;
      student.recruiterComments.leadership = req.body.recruiterComments.leadership;
      student.recruiterComments.behavior = req.body.recruiterComments.behavior;
      student.recruiterComments.communication = req.body.recruiterComments.communication;
      student.recruiterComments.critThinking = req.body.recruiterComments.critThinking;
      student.recruiterComments.techKnowledge = req.body.recruiterComments.techKnowledge;
      student.recruiterComments.candidacy = req.body.recruiterComments.candidacy;
    }


  /* Save the article */
  student.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(student);
    }
  });
};


/* Delete a listing */
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
  Student.find().populate('interview')
  .exec(function(err, students) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.json(students);
    }
  });
  //student.email.forEach(function(element) {
      // $scope.demo += element + ",";

   //});
};

exports.uploadResumePicture = function (req, res) {
  var student = req.student;
  var message = null;
  var upload = multer(config.uploads.resumeUpload).single('resumePicture');
  var resumeUploadFileFilter = require(path.resolve('./config/lib/multer')).resumeUploadFileFilter;

  // Filtering to upload only images
  upload.fileFilter = resumeUploadFileFilter;

//  if (student) {
    upload(req, res, function (uploadError) {
      if(uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading resume picture'
        });
      } else {
        student.resumeImageURL = config.uploads.resumeUpload.dest + req.file.filename;
      }
    })
//  }
};

/*
  Middleware: find a student by its ID, then pass it to the next request handler.

  HINT: Find the student using a mongoose query,
        bind it to the request object as the property 'student',
        then finally call next
 */
exports.studentByID = function(req, res, next, id) {
  Student.findById(id).populate('interview')
  .exec(function(err, student) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.student = student;
      next();
    }
  });
};

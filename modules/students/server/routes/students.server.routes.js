'use strict';

module.exports = function (app) {
  // User Routes
  var students = require('../controllers/students.server.controller.js'),
    express = require('express'),
    //image imports needed
    multer = require('multer');
   

 

  app.route('/api/register').post(students.create);
  app.route('/api/employee/viewList').get(students.list);
  app.route('/api/employee/student/:studentID')
    .get(students.read)
    .put(students.update)
    .delete(students.delete);
  //route for resume picture upload

  



  // Finish by binding the user middleware
  app.param('studentID', students.studentByID);
};
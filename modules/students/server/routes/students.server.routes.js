'use strict';

module.exports = function (app) {
  // User Routes
  var students = require('../controllers/students.server.controller.js'),
    express = require('express');

  app.route('/api/register').post(students.create);
  app.route('/api/employee/viewList').get(students.list);
  app.route('/api/employee/student/:studentID')
    .get(students.read)
    .put(students.update)
    .delete(students.delete);
  app.route('/api/employee/student/resume').post(students.uploadResumePicture);

  // Finish by binding the user middleware
  app.param('studentID', students.studentByID);
};

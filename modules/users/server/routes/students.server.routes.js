'use strict';

module.exports = function (app) {
  // User Routes
  var students = require('C:/Users/Stephanie/Documents/mean/modules/users/server/controllers/students.server.controller.js'),
    express = require('express');

  app.route('/register').post(students.create);
  app.route('/employee/viewList').get(students.list);
  app.route('/employee/:studentID')
    .get(students.read)
    .put(students.update)
    .delete(students.delete);

  // Finish by binding the user middleware
  app.param('studentId', students.studentById);
};
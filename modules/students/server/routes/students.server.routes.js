'use strict';

module.exports = function (app) {
  // User Routes
  var students = require('../controllers/students.server.controller.js'),
    express = require('express'),
    adminPolicy = require('../policies/students.server.policy');

  app.route('/api/register').post(students.create);
  app.route('/api/employee/viewList').get(adminPolicy.isAllowed, students.list);
  app.route('/api/employee/student/:studentID')
    .get(adminPolicy.isAllowed, students.read)
    .put(adminPolicy.isAllowed, students.update)
    .delete(adminPolicy.isAllowed, students.delete);

  // Finish by binding the user middleware
  app.param('studentID', students.studentByID);
};
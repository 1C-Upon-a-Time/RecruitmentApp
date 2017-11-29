'use strict';

module.exports = function (app) {
  // User Routes
  var interviewSlots = require('../controllers/calendar.server.interviewSlotController.js'),
    express = require('express'),
    adminPolicy = require('../policies/calendar.server.policy');

  app.route('/api/employee/interviewInvite').post(adminPolicy.isAllowed, interviewSlots.sendInvite);
  app.route('/api/employee/interviewSlot').post(adminPolicy.isAllowed, interviewSlots.create);
  app.route('/api/employee/viewInterviewSlots').get(adminPolicy.isAllowed, interviewSlots.list);
  app.route('/api/employee/slot/:interviewSlotId')
    .get(adminPolicy.isAllowed, interviewSlots.read)
    .put(adminPolicy.isAllowed, interviewSlots.update)
    .delete(adminPolicy.isAllowed, interviewSlots.delete);

  // Finish by binding the user middleware
  app.param('interviewSlotId', interviewSlots.interviewByID);
};
'use strict';

module.exports = function (app) {
  // User Routes
  var interviewSlots = require('../controllers/calendar.server.interviewSlotController.js'),
    express = require('express');

  app.route('/api/employee/interviewInvite').post(interviewSlots.sendInvite);
  app.route('/api/employee/interviewSlot').post(interviewSlots.create);
  app.route('/api/employee/bulkInterviewSlots').post(interviewSlots.bulkCreate);
  app.route('/api/employee/viewInterviewSlots').get(interviewSlots.list);
  app.route('/api/employee/slot/:interviewSlotId')
    .get(interviewSlots.read)
    .put(interviewSlots.update)
    .delete(interviewSlots.delete);

  // Finish by binding the user middleware
  app.param('interviewSlotId', interviewSlots.interviewByID);
};
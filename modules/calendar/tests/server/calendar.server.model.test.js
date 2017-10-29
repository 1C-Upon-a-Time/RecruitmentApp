'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  InterviewSlot = require('../../server/models/calendar.server.interviewSlotModel.js'),
  config = require('../../../../config/env/development');

/**
 * Globals
 */
var slot1, slot2, slot3, id;
slot1 = {
  date: new Date(),
  slot: 2,
  available: false
};
/**
 * Unit tests
 */
describe('interview slot Schema Unit Tests', function() {

  before(function(done) {
    mongoose.connect(config.db.uri);
    done();
  });

  describe('Saving to database', function() {
    /*
      Mocha's default timeout for tests is 2000ms. To ensure that the tests do not fail 
      prematurely, we can increase the timeout setting with the method this.timeout()
     */
    this.timeout(10000);

    it('saves properly when required elements provided', function(done){
      new InterviewSlot({
        date: slot1.date,
        slot: slot1.slot,
        available: slot1.available
      }).save(function(err, slot1){
        should.not.exist(err);
        id = slot1._id;
        done();
      });
    });


  afterEach(function(done) {
    if(id) {
      InterviewSlot.remove({ _id: id }).exec(function() {
        id = null;
        done();
      });
    } else {
      done();
    }
  });
});
});
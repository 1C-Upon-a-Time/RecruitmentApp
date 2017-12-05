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
  startDate: new Date(),
  endDate: new Date(),
  slot: 2,
  isAvailable: false
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

    it('saves properly when all required elements provided', function(done){
      new InterviewSlot({
        startDate: slot1.startDate,
        endDate: slot1.endDate,
        slot: slot1.slot,
        isAvailable: slot1.isAvailable
      }).save(function(err, slot1){
        should.not.exist(err);
        id = slot1._id;
        done();
      });
    });
    it('throws and error when startDate not provided', function(done){
      new InterviewSlot({
        endDate: slot1.endDate,
        slot: slot1.slot,
        isAvailable: slot1.isAvailable
      }).save(function(err, slot1){
        should.exist(err);
        done();
      });
    });
    it('throws and error when endDate not provided', function(done){
      new InterviewSlot({
        startDate: slot1.startDate,
        slot: slot1.slot,
        isAvailable: slot1.isAvailable
      }).save(function(err, slot1){
        should.exist(err);
        done();
      });
    });
   it('throws and error when slot not provided', function(done){
      new InterviewSlot({
        startDate: slot1.startDate,
        endDate: slot1.endDate,
        isAvailable: slot1.isAvailable
      }).save(function(err, slot1){
        should.exist(err);
        done();
      });
    });
    it('Saves when isAvailable not provided', function(done){
      new InterviewSlot({
        startDate: slot1.startDate,
        endDate: slot1.endDate,
        slot: slot1.slot
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
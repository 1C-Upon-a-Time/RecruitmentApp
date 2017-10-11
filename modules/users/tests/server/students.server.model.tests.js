"use strict";

var should = require('should'), 
  mongoose = require('mongoose'), 
  Student = require('C:/Users/Stephanie/Documents/mean/modules/users/server/models/students.server.model'), 
  config = require('C:/Users/Stephanie/Documents/mean/config/env/development');

var student, id;

student = {
  name: "Big toe", 
  email: "bobdoe@ufl.edu", 
  major: "Chem Eng",
  phone: "5557825277",
  applyingFor: 2,
  recruiterComments:{
    approach: 1,
    behavior: 2,
    critThinking: 3,
    techKnowledge: 4,
    candidacy: 5
  }
};

describe('student Schema Unit Tests', function() {

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
      new Student({
        name: student.name, 
        email: student.email,
        major: student.major,
        recruiterComments:{
          approach: student.recruiterComments.approach,
          behavior: student.recruiterComments.behavior,
          critThinking: student.recruiterComments.critThinking,
          techKnowledge: student.recruiterComments.techKnowledge,
          candidacy: student.recruiterComments.candidacy
        }
      }).save(function(err, student){
        should.not.exist(err);
        id = student._id;
        done();
      });
    });

    it('saves properly when all properties provided', function(done){
      new Student(student).save(function(err, student){
        should.not.exist(err);
        id = student._id;
        done();
      });
    });

    it('throws an error when name not provided', function(done){
      new Student({ 
        email: student.email,
        major: student.major,
        recruiterComments:{
          approach: student.recruiterComments.approach,
          behavior: student.recruiterComments.behavior,
          critThinking: student.recruiterComments.critThinking,
          techKnowledge: student.recruiterComments.techKnowledge,
          candidacy: student.recruiterComments.candidacy
        }
      }).save(function(err){
        should.exist(err);
        done();
      });
    });

    it('throws an error when email not provided', function(done){
      new Student({ 
        name: student.name,
        major: student.major,
        recruiterComments:{
          approach: student.recruiterComments.approach,
          behavior: student.recruiterComments.behavior,
          critThinking: student.recruiterComments.critThinking,
          techKnowledge: student.recruiterComments.techKnowledge,
          candidacy: student.recruiterComments.candidacy
        }
      }).save(function(err){
        should.exist(err);
        done();
      });
    });

    it('throws an error when major not provided', function(done){
      new Student({ 
        name: student.name,
        email: student.email,
        recruiterComments:{
          approach: student.recruiterComments.approach,
          behavior: student.recruiterComments.behavior,
          critThinking: student.recruiterComments.critThinking,
          techKnowledge: student.recruiterComments.techKnowledge,
          candidacy: student.recruiterComments.candidacy

        }
      }).save(function(err){
        should.exist(err);
        done();
      });
    });

    it('throws an error when approach not provided', function(done){
      new Student({ 
        name: student.name,
        email: student.email,
        major: student.major,
        recruiterComments:{
          behavior: student.recruiterComments.behavior,
          critThinking: student.recruiterComments.critThinking,
          techKnowledge: student.recruiterComments.techKnowledge,
          candidacy: student.recruiterComments.candidacy
        }
      }).save(function(err){
        should.exist(err);
        done();
      });
    });
    it('throws an error when behavior not provided', function(done){
      new Student({ 
        name: student.name,
        email: student.email,
        major: student.major,
        recruiterComments:{
          approach: student.recruiterComments.approach,
          critThinking: student.recruiterComments.critThinking,
          techKnowledge: student.recruiterComments.techKnowledge,
          candidacy: student.recruiterComments.candidacy
        }
      }).save(function(err){
        should.exist(err);
        done();
      });
    });
    it('throws an error when critThinking not provided', function(done){
      new Student({ 
        name: student.name,
        email: student.email,
        major: student.major,
        recruiterComments:{
          approach: student.recruiterComments.approach,
          behavior: student.recruiterComments.behavior,
          critThinking: student.recruiterComments.critThinking,
          candidacy: student.recruiterComments.candidacy
        }
      }).save(function(err){
        should.exist(err);
        done();
      });
    });

    it('throws an error when techKnowledge not provided', function(done){
      new Student({ 
        name: student.name,
        email: student.email,
        major: student.major,
        recruiterComments:{
          approach: student.recruiterComments.approach,
          behavior: student.recruiterComments.behavior,
          critThinking: student.recruiterComments.critThinking,
          candidacy: student.recruiterComments.candidacy
        }
      }).save(function(err){
        should.exist(err);
        done();
      });
    });

    it('throws an error when candidacy not provided', function(done){
      new Student({ 
        name: student.name,
        email: student.email,
        major: student.major,
        recruiterComments:{
          approach: student.recruiterComments.approach,
          behavior: student.recruiterComments.behavior,
          critThinking: student.recruiterComments.critThinking,
          techKnowledge: student.recruiterComments.techKnowledge,
        }
      }).save(function(err){
        should.exist(err);
        done();
      });
    });

  });

  afterEach(function(done) {
    if(id) {
      Student.remove({ _id: id }).exec(function() {
        id = null;
        done();
      });
    } else {
      done();
    }
  });
});
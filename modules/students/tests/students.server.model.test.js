var should = require('should'), 
    mongoose = require('mongoose'), 
    Student = require('../server/models/students.server.model.js'), 
    config = require('../../../config/env/production.js');

var student = {
  name: 'Bertha',
  email: 'bertha@gmail.com', 
  major: 'CS',
  minor:'Math',
  phone: '5555555555',
  gpa: 3.0,
  fulltime: true,
  recruiterComments:{
    comments: 'good',
    leadership: 1,
    behavior: 2,
    communication:3,
    critThinking:4,
    techKnowledge:5,
    candidacy:6 
  }

};

var id;

describe('Student Schema Unit Tests', function() {

  before(function(done) {
    mongoose.connect(config.db.uri);
    done();
  });

  describe('Saving to database', function() {
    /*
      Mocha's default timeout for tests is 2000ms. Saving to MongoDB is an asynchronous task 
      that may take longer thatn 2000ms. To ensure that the tests do not fail prematurely, 
      we can increase the timeout setting with the method this.timeout()
     */
    this.timeout(10000);

    it('saves properly when only required fields provided', function(done){
      new Student({
        name: student.name, 
        email: student.email, 
        major: student.major
      }).save(function(err, doc){
        should.not.exist(err);
        id = doc._id;
        done();
      });
    });

    it('saves properly when all properties provided', function(done){
      new Student(student).save(function(err, doc){
        should.not.exist(err);
        id = doc._id;
        done();
      });
    });

    it('throws an error when name not provided', function(done){
     new Student({
        email: student.email, 
        major: student.major
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

    it('throws an error when email not provided', function(done){
      new Student({
        name: student.name,  
        major: student.major
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

    it('throws an error when major not provided', function(done){
      new Student({
        name: student.name,  
        email: student.email
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

  });

  afterEach(function(done) {
    if(id) {
      Student.remove({_id: id}, function(err){
        id = null;
        done();
      });
    } else {
      done();
    }
  });
});

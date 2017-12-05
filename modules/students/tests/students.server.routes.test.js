var should = require('should'), 
    request = require('supertest'), 
    express = require('../../../config/lib/express.js'), 
    Student = require('../server/models/students.server.model.js'),
    config = require('../../../config/env/production.js'),
    mongoose = require('mongoose');


/* Global variables */
var app, agent, student, id;

/* Unit tests for testing server side routes for the listings API */
describe('Students CRUD tests', function() {

  this.timeout(10000);

  before(function(done) {
    mongoose.connect(config.db.uri);
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  it('should it able to retrieve all students', function(done) {
    agent.get('/api/employee/viewList')
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);
        res.body.should.have.length(12);
        done();
      });
  });
  it('should be able to retrieve a single student', function(done) {
    Student.findOne({name: 'Luke Samuel'}, function(err, student) {
      if(err) {
        console.log(err);
      } else {
        agent.get('/api/employee/student/' + student._id)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            res.body.name.should.equal('Luke Samuel');
            res.body.email.should.equal('luke@bickell.com');
            res.body.major.should.equal('Apples');
            res.body.gpa.should.equal(3.78);
            res.body.phone.should.equal('23223223223');
            res.body.fulltime.should.equal(false);
            res.body.season.should.equal('Fall 2017');
            res.body.recruiterComments.candidacy.should.equal('0');
            res.body.recruiterComments.techKnowledge.should.equal('0');
            res.body.recruiterComments.critThinking.should.equal('0');
            res.body.recruiterComments.communication.should.equal('0');
            res.body.recruiterComments.behavior.should.equal('0');
            res.body.recruiterComments.leadership.should.equal('0');
            res.body._id.should.equal(student._id.toString());
            done();
          });
      }
    });
  });

  it('should be able to save a student', function(done) {

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
    agent.post('/api/register')
      .send(student)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res.body._id);
        res.body.name.should.equal('Bertha');
        res.body.email.should.equal('bertha@gmail.com');
        res.body.major.should.equal('CS');
        res.body.minor.should.equal('Math');
        res.body.gpa.should.equal(3.0);
        res.body.phone.should.equal('5555555555');
        res.body.fulltime.should.equal(true);
        res.body.season.should.equal('Fall 2017');
        res.body.recruiterComments.comments.should.equal('good');
        res.body.recruiterComments.candidacy.should.equal(1);
        res.body.recruiterComments.techKnowledge.should.equal(2);
        res.body.recruiterComments.critThinking.should.equal(3);
        res.body.recruiterComments.communication.should.equal(4);
        res.body.recruiterComments.behavior.should.equal(5);
        res.body.recruiterComments.leadership.should.equal(6);
        id = res.body._id;
        done();
      });
  });

  it('should be able to update a student', function(done) {
    var updatedStudent = {
      name: 'Bertha Big',
      email: 'bigbertha@gmail.com', 
      major: 'CS',
      minor:'Math',
      phone: '5555555535',
      gpa: 3.0,
      fulltime: true,
      recruiterComments:{
        comments: 'good',
        leadership: 1,
        behavior: 2,
        communication:3,
        critThinking:4,
        techKnowledge:5,
        candidacy:1 
      }
    };
    agent.put('/api/employee/student/' + id)
      .send(updatedStudent)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res.body._id);
        res.body.name.should.equal('Bertha Big');
        res.body.email.should.equal('bigbertha@gmail.com');
        res.body.major.should.equal('CS');
        res.body.minor.should.equal('Math');
        res.body.gpa.should.equal(3.0);
        res.body.phone.should.equal('5555555535');
        res.body.fulltime.should.equal(true);
        res.body.season.should.equal('Fall 2017');
        res.body.recruiterComments.comments.should.equal('good');
        res.body.recruiterComments.candidacy.should.equal(1);
        res.body.recruiterComments.techKnowledge.should.equal(2);
        res.body.recruiterComments.critThinking.should.equal(3);
        res.body.recruiterComments.communication.should.equal(4);
        res.body.recruiterComments.behavior.should.equal(5);
        res.body.recruiterComments.leadership.should.equal(1);
        done();
      });
  });

  it('should be able to delete a student', function(done) {
    agent.delete('/api/employee/student/' + id)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);

        agent.get('/api/employee/student/' + id) 
          .expect(400)
          .end(function(err, res) {
            id = undefined;
            done();
          });
      })
  });

  after(function(done) {
    if(id) {
      Student.remove({_id: id}, function(err){
        if(err) throw err;
        done();
      })
    } else {
      done();
    }
  });
});

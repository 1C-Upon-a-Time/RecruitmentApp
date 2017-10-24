'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var studentSchema = new Schema({
  name:{
    type:String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  major:{
    type: String,
    required: true
  },
  gpa: Number,
  phone: String,
  applyingFor: Number,
  recruiterComments:{
    comments: String,
    leadership:{
      type: Number,
      required: true
    },
    behavior:{
      type: Number,
      required: true
    },
    communication:{
      type: Number,
      required: true
    },
    critThinking: {
      type: Number,
      required: true
    },
    techKnowledge: {
      type: Number,
      required: true
    },
    candidacy: {
      type: Number,
      required: true
    },
    created_at: Date,
    updated_at: Date
  },
  created_at: Date,
  updated_at: Date
});


studentSchema.pre('save', function(next) {
  var currentTime = new Date();
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

//var Student = mongoose.model('Student', studentSchema);
module.exports = mongoose.model('student', studentSchema);

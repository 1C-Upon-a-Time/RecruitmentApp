"use strict";
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var studentSchema = new Schema({
  firstName:{
    type:String,
    required: true
  },
  lastName:{
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
  minor: String,
  phone: String,
  gpa: Number,
  interview: {
    type: Schema.Types.ObjectId,
    ref: 'InterviewSlot',
    default: null
  },
  fulltime : Boolean,
  season : String,
  recruiterComments:{
    comments: String,
    leadership:{
      type:Number,
      required: true,
      default: 0
    },
    behavior:{
      type:Number,
      required: true,
      default: 0
    },
    communication:{
      type:Number,
      required: true,
      default: 0
    },
    critThinking:{
      type:Number,
      required: true,
      default: 0
    },
    techKnowledge:{
      type: Number,
      required: true,
      default: 0
    },
    candidacy: {
      type:Number,
      required: true,
      default: 0
    },
    updated_at: Date
  },
  inline:{
    type: Boolean,
    default: true
  },
  created_at: Date,
  updated_at: Date
});


studentSchema.pre('save', function(next) {
  var currentTime = new Date();
  this.recruiterComments.updated_at = currentTime;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

var Student = mongoose.model('Student', studentSchema);
module.exports = Student;

"use strict";
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var interviewSlotSchema = new Schema({
  date:{
    type: Date,
    required: true
  },
  slot:{
    type: Number,
    enum: [1,2,3,4,5,6],
    required: true
  },
  isAvailable:{
    type: Boolean,
    default: true,
    required: true
  },
  created_at: Date,
  updated_at: Date 
});


interviewSlotSchema.pre('save', function(next) {
  var currentTime = new Date();
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

var InterviewSlot = mongoose.model('InterviewSlot', interviewSlotSchema);
module.exports = InterviewSlot;
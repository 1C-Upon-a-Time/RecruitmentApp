'use strict';
angular.module('calendar').controller('SlotsController', ['$scope', '$location', '$stateParams', '$state', '$http', 'InterviewSlots', 'Students',
function($scope, $location, $stateParams, $state, $http, InterviewSlots, Students){

  $scope.durations = [30,45,60];
  // MOST OF THESE SHOULD BE ROOTSCOPE DEFINED FROM AN ADMIN LEVEL CONTROLLER
  $scope.hours = [8,9,10,11,13,14,15,16];
  $scope.slots = [1,2,3,4,5,6];
  $scope.numRecruiters = 3;
  $scope.day = new Date(2017,11,4);
  $scope.interviewArrays = [];
  $scope.selectingStudentInterview = false;
  if ($stateParams.studentId)
  {
    $scope.selectingStudentInterview = true;
    $scope.studentId = $stateParams.studentId;
  }

  $scope.init = function(){
    $scope.getInterviews();
    if ($scope.selectingStudentInterview) {
      $scope.getStudent();
    }

    var startTime = new Date();
    startTime.setHours(8);
    startTime.setMinutes(0);
    startTime.setSeconds(0);
    startTime.setMilliseconds(0);
    var endTime = new Date();
    endTime.setHours(15);
    endTime.setMinutes(0);
    endTime.setSeconds(0);
    endTime.setMilliseconds(0);

    $scope.batch = 
    {
        duration : 60,
        startTime : startTime,
        endTime : endTime,
        inputDate : startTime,
        interviewsPerSlot : 3
    };
    $scope.minDate = new Date();
  };

  // Gets all the interview slots.
  $scope.getInterviews = function() {
    /* set loader*/
    $scope.loading = true;

    /* Get all the Slots, then bind it to the scope */
    InterviewSlots.getAll().then(function(response) {
      $scope.loading = false; //remove loader
      $scope.interviews = response.data;
      // console.log("Successfully retrieved slots!");
      // console.log($scope.interviews);
    }, function(error) {
      $scope.loading = false;
      $scope.error = 'Unable to retrieve Interview Slots!\n' + error;
    });

  };

  $scope.addBatch = function(batch){
    console.log(batch);

    // Diff between start and time (9 in ms)
    var timeDiff = batch.endTime - batch.startTime;
    // Minute difference
    timeDiff = timeDiff / 60000;
    // console.log(timeDiff);

    // Number of slots to be created at different times
    var numTimes = Math.floor(timeDiff / batch.duration);
    // console.log("nTimes " + numTimes);

    var startHour = batch.startTime.getHours();
    // console.log("startHour " + startHour);

    var interviewSlots = [];
    var test = [];
    for (var i = 0; i < numTimes; i++)
    {
        var hoursToAdd = Math.floor((i*batch.duration) / 60);
        var minutesToAdd = (i*batch.duration) % 60;
        var slotDate = new Date(batch.inputDate);
        slotDate.setHours(startHour + hoursToAdd);
        slotDate.setMinutes(minutesToAdd);

        for (var j = 0; j < batch.interviewsPerSlot; j++)
        {
          var newSlot = 
          {
              date : slotDate,
              duration : batch.duration,
              slot : j+1
          };

          interviewSlots.push(newSlot);
        }
    }

    InterviewSlots.bulkCreate(interviewSlots);    

    $scope.getInterviews();
  };


  // Find student information
  $scope.getStudent = function() {
    //debugger;
    $scope.loading = true;

    var id = $stateParams.studentId;

    Students.read(id)
    .then(function(response) {
      $scope.student = response.data;
      $scope.loading = false;
    }, function(error) {
      $scope.error = 'Unable to retrieve student with id "' + id + '"\n' + error;
      $scope.loading = false;
    });
  };

  // Just calls the update method
  $scope.selectForInterview = function(interview) {
    var date = new Date(interview.date);
    var confirmText = "Confirm " + $scope.student.name + " for " + date + " and send email to " + $scope.student.email + "?";
    if (confirm(confirmText))
    {
      var a = document.getElementById("autoEmail");
      a.href="mailto:"+$scope.student.email+
      "?Subject=Interview Request&Body=We are looking forward to your interview tomorrow at "+interview.date+" in LOCATION";
      $scope.update(interview);
      alert("Interview scheduled!");

    }
  };


    // $scope.createDayInterviewSlots = function() {
    //     // SET GLOBAL "DAY" VARIABLE
    //     var day = new Date(2017,11,4);
    //     var numRecruiters = 3;
    //     var hours = [8,9,10,11,13,14,15];
    //     console.log(day);
    //     console.log(numRecruiters);
    //     console.log(hours);
    //     for (var i = 0; i < hours.length; i++)
    //     {
    //         for (var j = 0; j < numRecruiters; j++)
    //         {
    //             var interviewSlot = {
    //                 // Date setHours is 0-23
    //                 date: day.setHours(hours[i]),
    //                 slot: j+1
    //             };

    //             InterviewSlots.create(interviewSlot);
    //             console.log("Slot created!");
    //         }
    //     }
    // };

    // Updates objects with references to each other
    $scope.update = function(interview) {
        var interviewSlot = interview;
        var updatedStudent = $scope.student;

        var slot_id = interviewSlot._id;
        var student_id = updatedStudent._id;

        // Slot is no longer available
        interviewSlot.isAvailable = !interviewSlot.isAvailable;
        // Set slot's scheduled student
        interviewSlot.student = $scope.student._id;

        updatedStudent.interview = interviewSlot._id;

        /* Save the article using the Listings factory */
        InterviewSlots.update(slot_id, interviewSlot)
        .then(function(response) {
            console.log("Slot updated!");
        }, function(error) {
        //otherwise display the error
            $scope.error = 'Unable to update slot!\n' + error;
        });

        Students.update(student_id,updatedStudent)
        .then(function(reponse){
            console.log("Interview assigned to student!");
        }, function(error) {
          //otherwise display the error
          $scope.error = 'Unable to update student!\n' + error;
      });
    };
  }
]);

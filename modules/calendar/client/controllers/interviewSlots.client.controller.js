'use strict';
angular.module('calendar').controller('SlotsController', ['$scope', '$location', '$stateParams', '$state', '$http', 'InterviewSlots', 'Students',
function($scope, $location, $stateParams, $state, $http, InterviewSlots, Students){

  $scope.durations = [30,45,60];
  $scope.slots = [1,2,3,4,5,6];
  $scope.selectingStudentInterview = false;
  $scope.tempDays = [];
  $scope.days = [];

  // Determine whether a student is being selected by checking stateParams
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

    // Start times are today's date by default
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

      // Sort out the days properly
      for (var i = 0; i < $scope.interviews.length; i++)
      {
        var interviewDate = new Date($scope.interviews[i].startDate);
        var date = new Date(interviewDate.getFullYear(), interviewDate.getMonth(), interviewDate.getDate(),0,0,0,0);

        if ($scope.tempDays.indexOf(date.getTime()) == -1)
        {
          $scope.tempDays.push(date.getTime());
        }
      }

      for (var j = 0; j < $scope.tempDays.length; j++)
      {
        console.log($scope.tempDays[j]);
        $scope.days.push(new Date($scope.tempDays[j]));
      }


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

    // Number of slots to be created at different times
    var numTimes = Math.floor(timeDiff / batch.duration);

    var startHour = batch.startTime.getHours();

    var interviewSlots = [];
    var test = [];
    for (var i = 0; i < numTimes; i++)
    {
        var hoursToAdd = Math.floor((i*batch.duration) / 60);
        var minutesToAdd = (i*batch.duration) % 60;

        var startDate = new Date(batch.inputDate);
        startDate.setHours(startHour + hoursToAdd);
        startDate.setMinutes(minutesToAdd);

        hoursToAdd = Math.floor(batch.duration / 60);
        minutesToAdd = batch.duration % 60;
        var endDate = new Date(batch.inputDate);
        endDate.setHours(startDate.getHours() + hoursToAdd);
        endDate.setMinutes(startDate.getMinutes() + minutesToAdd);

        for (var j = 0; j < batch.interviewsPerSlot; j++)
        {
          var newSlot = 
          {
              startDate : startDate,
              endDate : endDate,
              slot : j+1
          };
          console.log(newSlot);
          interviewSlots.push(newSlot);
        }
    }

    InterviewSlots.bulkCreate(interviewSlots);    

    $scope.getInterviews();
  };

  $scope.addCustom = function(custom)
  {
    var startDate = new Date($scope.batch.inputDate);
    startDate.setHours(custom.startTime.getHours());
    startDate.setMinutes(custom.startTime.getMinutes());

    var endDate = new Date($scope.batch.inputDate);
    endDate.setHours(custom.endTime.getHours());
    endDate.setMinutes(custom.endTime.getMinutes());

    var newSlot = 
    {
      endDate : endDate,
      startDate : startDate,
      slot: 1
    };

    InterviewSlots.create(newSlot);

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

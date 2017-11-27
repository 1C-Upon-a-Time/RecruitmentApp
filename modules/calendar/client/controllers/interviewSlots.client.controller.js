'use strict';
angular.module('calendar').controller('SlotsController', ['$scope', '$location', '$stateParams', '$state', '$http', 'InterviewSlots', 'Students',
function($scope, $location, $stateParams, $state, $http, InterviewSlots, Students){

  // MOST OF THESE SHOULD BE ROOTSCOPE DEFINED FROM AN ADMIN LEVEL CONTROLLER
  $scope.hours = [8,9,10,11,13,14,15,16];
  $scope.slots = [1,2,3];
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
    if (confirm(confirmText)) {
      $scope.update(interview);
      $scope.sendInvite(interview);
      alert("Interview scheduled!");
    }
  };

  $scope.sendInvite = function (interview) {
    $http.post('/api/employee/interviewInvite', interview);
  };
  
  $scope.createDayInterviewSlots = function() {
    // SET GLOBAL "DAY" VARIABLE
    var day = new Date(2017,11,4);
    var numRecruiters = 3;
    var hours = [8,9,10,11,13,14,15,16];
    console.log(day);
    console.log(numRecruiters);
    console.log(hours);
    for (var i = 0; i < hours.length; i++)
    {
      for (var j = 0; j < numRecruiters; j++)
      {
        var interviewSlot = {
          // Date setHours is 0-23
          date: day.setHours(hours[i]-1),
          slot: j+1
        };

        InterviewSlots.create(interviewSlot);
        console.log("Slot created!");
      }
    }
  };

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

'use strict';
angular.module('calendar').controller('SlotsController', ['$scope', '$location', '$stateParams', '$state', '$http', 'InterviewSlots',
  function($scope, $location, $stateParams, $state, $http, InterviewSlots){
    $scope.interviews = "";
    // MOST OF THESE SHOULD BE ROOTSCOPE DEFINED FROM AN ADMIN LEVEL CONTROLLER
    $scope.hours = [8,9,10,11,13,14,15,16];
    $scope.slots = [1,2,3];
    $scope.numRecruiters = 3;
    $scope.day = new Date(2017,9,3);
    $scope.interviewArrays = [];
    $scope.selectingStudentInterview = false;
    if ($stateParams.studentId)
    {
        $scope.selectingStudentInterview = true;
    }

    // Gets all the interview slots.
    $scope.getInterviews = function() {
      /* set loader*/
      $scope.loading = true;

      /* Get all the Students, then bind it to the scope */
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

    // Hacky filter for table so that it displays the slots in the correct time
    $scope.slotFilter = function(hour)
    {
        return function(interview)
        {
            var interviewHour = new Date(interview.date).getHours();
            return hour===interviewHour;
        };

    };

    // $scope.formatInterviewDates = function(){
    //     console.log($scope.interviews.length);
    //   for (var i = 0; i < $scope.interviews.length; i++)
    //   {
    //     console.log("test 1");
    //     var date = new Date($scope.interviews[i].date);
    //     //$scope.interviews[i].date = date;
    //     $scope.interviews[i].hour = date.getHours();
    //     console.log("test 2");
    //     console.log("a " + $scope.interviews[i].date.getHours());
    //   }
    // }

    // Just calls the update method
    $scope.selectInterview = function(interview) {
        console.log(interview._id);
        if ($stateParams.studentId)
        {
            console.log("student: " + $stateParams.studentId);
        }
        $scope.update(interview);
    };

    // // THIS METHOD SHOULD BE PART OF THE ADMIN CONTROLLER
    // $scope.createDayInterviewSlots = function(day, numRecruiters, hours) {
    //     // SET GLOBAL "DAY" VARIABLE

    //     for (var i = 0; i < hours.length; i++)
    //     {
    //         for (var j = 0; j < numRecruiters; j++)
    //         {
    //             var interviewSlot = {
    //                 // Date setHours is 0-23
    //                 date: day.setHours(hours[i-1]),
    //                 slot: j+1,
    //             };

    //             InterviewSlots.create(interviewSlot);
    //             console.log("Slot created!");
    //         }
    //     }
    // };

    // Reverses the availability of the slot selected
    $scope.update = function(interview) {
        var interviewSlot = interview;
        var id = interviewSlot._id;
        interviewSlot.isAvailable = !interviewSlot.isAvailable;

        /* Save the article using the Listings factory */
        InterviewSlots.update(id, interviewSlot)
        .then(function(response) {
            console.log("successfully updated");
        }, function(error) {
        //otherwise display the error
            $scope.error = 'Unable to update slot!\n' + error;
        });
    };
  }
]);
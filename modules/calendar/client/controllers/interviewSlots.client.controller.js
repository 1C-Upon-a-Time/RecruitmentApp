'use strict';
angular.module('calendar').controller('SlotsController', ['$scope', '$location', '$stateParams', '$state', '$http', 'InterviewSlots',
  function($scope, $location, $stateParams, $state, $http, InterviewSlots){
    $scope.listings = "";
    $scope.hours = [8,9,10,11,13,14,15,16];
    $scope.slots = [1,2,3];
    $scope.numRecruiters = 3;
    // NEED TO GET INTERVIEW DAY FROM SOMEWHERE -- ADMIN SHOULD SET INTERVIEW DATE, AND THAT WILL BE REFLECTED HERE
    $scope.day = new Date(2017,9,3);

    // Gets all the interview slots.
    $scope.getInterviews = function() {
      /* set loader*/
      $scope.loading = true;

      /* Get all the Students, then bind it to the scope */
      InterviewSlots.getAll().then(function(response) {
        $scope.loading = false; //remove loader
        $scope.interviews = response.data;
        console.log("Successfully retrieved slots!");
        console.log($scope.interviews);
      }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve Interview Slots!\n' + error;
      });
    };

    //Future reference, not needed but just to let us debug things
    // $http.get("/api/employee/viewList").then(function(response){
    //   $scope.listings = response.data;
    // });
    // console.log($scope.listings);

    $scope.selectInterview = function(hour, slot) {
        var interviewSlot;
        // Find the interview slot that corresponds to that time and slot #
        for (var i = 0; i < $scope.interviews.length; i++){

            var interview = $scope.interviews[i];
            // Get a date object so we can get hour from the stored date string
            var date = new Date(interview.date);

            if (date.hour === hour && interview.slot === slot){
                interviewSlot = interview;
                break;
            }
            else if (i === $scope.interviews.length-1){
                console.log("Could not find an interview slot corresponding to that date and time!");
                return;
            }
        }

        $scope.update(interviewSlot);

    };

    // THIS METHOD SHOULD BE PART OF THE ADMIN CONTROLLER
    $scope.createDayInterviewSlots = function(day, numRecruiters, hours) {
        // SET GLOBAL "DAY" VARIABLE

        for (var i = 0; i < hours.length; i++)
        {
            for (var j = 0; j < numRecruiters; j++)
            {
                var interviewSlot = {
                    // Date setHours is 0-23
                    date: day.setHours(hours[i-1]),
                    slot: j+1,
                };

                InterviewSlots.create(interviewSlot);
                console.log("Slot created!");
            }
        }
    };

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



  }//end of function
]);
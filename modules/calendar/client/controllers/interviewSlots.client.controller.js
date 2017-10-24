'use strict';
angular.module('calendar').controller('SlotsController', ['$scope', '$location', '$stateParams', '$state', '$http', 'InterviewSlots',
  function($scope, $location, $stateParams, $state, $http, InterviewSlots){
    $scope.lol = "lol";
    $scope.hours = [8,9,10,11,13,14,15,16];
    $scope.slots = [1,2,3];
    $scope.numRecruiters = 3;
    // NEED TO GET INTERVIEW DAY FROM SOMEWHERE -- ADMIN SHOULD SET INTERVIEW DATE, AND THAT WILL BE REFLECTED HERE
    $scope.day = new Date(2017,9,3);

    // Gets all the interview slots.
    // $scope.find = function() {
    //   /* set loader*/
    //   $scope.loading = true;

    //   /* Get all the Students, then bind it to the scope */
    //   Students.getAll().then(function(response) {
    //     $scope.loading = false; //remove loader
    //     $scope.listings = response.data;
    //   }, function(error) {
    //     $scope.loading = false;
    //     $scope.error = 'Unable to retrieve Students!\n' + error;
    //   });
    // };

    //Future reference, not needed but just to let us debug things
    // $http.get("/api/employee/viewList").then(function(response){
    //   $scope.listings = response.data;
    // });
    // console.log($scope.listings);
    $scope.selectInterview = function(hour, slot) {

    };

    // THIS METHOD SHOULD BE PART OF THE ADMIN CONTROLLER
    $scope.createDayInterviewSlots = function(day, numRecruiters, hours) {
        // SET GLOBAL "DAY" VARIABLE

        for (var i = 0; i < hours.length; i++)
        {
            for (var j = 0; j < numRecruiters; j++)
            {
                var interviewSlot = {
                    date: day.setHours(hours[i]),
                    slot: j+1,
                };


                InterviewSlots.create(interviewSlot);
                console.log("Slot created!");
            }
        }
    };



  }//end of function
]);
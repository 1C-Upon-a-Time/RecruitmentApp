'use strict';
angular.module('calendar').controller('SlotsController', ['$scope', '$location', '$stateParams', '$state', '$http', 'InterviewSlots',
  function($scope, $location, $stateParams, $state, $http, InterviewSlots){



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

  $scope.create = function(isValid) {
        $scope.error = null;

    
        //More important to save what is required
        var interviewSlot = {
        };


        InterviewSlots.create(interviewSlot);
      
      };



  }//end of function
]);
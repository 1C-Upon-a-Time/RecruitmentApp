'use strict';
angular.module('students').controller('StudentsController', ['$scope', '$location', '$stateParams', '$state', '$http',
  function($scope, $location, $stateParams, $state, $http){
    $scope.find = function() {
      /* set loader*/
      $scope.loading = true;

      /* Get all the Students, then bind it to the scope */
      Students.getAll().then(function(response) {
        $scope.loading = false; //remove loader
        $scope.Students = response.data;
      }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve Students!\n' + error;
      });
    };

    $http.get("/api/employee/viewList").then(function(response){
      $scope.listings = response.data;
    });
    console.log($scope.listings);
  }
]);
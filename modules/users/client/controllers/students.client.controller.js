'use strict';
angular.module('students').controller('StudentsController', ['$scope', '$location', '$stateParams', '$state', '$http', 'Students',
  function($scope, $location, $stateParams, $state, $http, Students){
    $scope.find = function() {
      /* set loader*/
      $scope.loading = true;

      /* Get all the Students, then bind it to the scope */
      Students.getAll().then(function(response) {
        $scope.loading = false; //remove loader
        $scope.listings = response.data;
      }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve Students!\n' + error;
      });
    };

    //Future reference, not needed but just to let us debug things
    // $http.get("/api/employee/viewList").then(function(response){
    //   $scope.listings = response.data;
    // });
    // console.log($scope.listings);

  $scope.create = function(isValid) {
        $scope.error = null;

      
        if (!isValid) {
          $scope.$broadcast('show-errors-check-validity', 'registerForm');

          return false;
        }

        //More important to save what is required
        var student = {
          name: $scope.name, 
          email: $scope.email,
          major: $scope.major,
          minor: $scope.minor,
          gpa: $scope.gpa,
          phone: $scope.phonenumber
        };


        Students.create(student)
        .then(function(response) {
                //if the object is successfully saved redirect back to the home page
                $state.go('/', { successMessage: 'Student succesfully created!' });
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to save student!\n' + error;
              });
      };



  }//end of function
]);
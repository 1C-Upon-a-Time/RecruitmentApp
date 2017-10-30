'use strict';
angular.module('students').controller('StudentsController', ['$scope', '$location', '$stateParams', '$state', '$http', 'Students',
  function($scope, $location, $stateParams, $state, $http, Students){
    //gets all of the students
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

  //set the sort filter to it's default first
  $scope.sort = "-created_at";

  //pagination of candidates
    //sets default value of current entries to 10
  $scope.currentPage = 1;
  $scope.pageSize = "10";



  //filtering function
    //sets it to any by default for the any option
  $scope.filter = "any";
  $scope.customFilter = function(student){
    //I need a default any for filters and then I need a season filter, but we don't have that variable in the model yet 
    //Case insensitive
    //checks if the search bar is currently null. If so, just load everything in the 
    //student database anyways
    if(!$scope.query){
      return true;
    }
    else if($scope.filter === "any"){
      return (student.major.toUpperCase().indexOf($scope.query.toUpperCase() || '') !== -1) || 
             (student.name.toUpperCase().indexOf($scope.query.toUpperCase() || '') !== -1) ;
    }
    else if($scope.filter == "name"){
      return student.name.toUpperCase().indexOf($scope.query.toUpperCase() || '') !== -1;
    }
    else if($scope.filter === "major"){
      return student.major.toUpperCase().indexOf($scope.query.toUpperCase() || '') !== -1;
    }
  };

  function isEmpty(str){
    return !str.replace(/^\s+/g, '').length; // boolean (`true` if field is empty)
  }



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
          phone: $scope.phonenumber,
          fulltime: $scope.fulltime
        };


        Students.create(student)
        .then(function(response) {
                //go to the confirmation response page to say the info was
                //successfully received and to see if they want to send in another response
                $state.go('form.confirmation', { successMessage: 'Student succesfully created!' });
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to save student!\n' + error;
              });
      };



  }//end of function
]).filter('startFrom', function(){
  return function(data,start){
    start = 0 + start;
    return data.slice(start);
  }
});




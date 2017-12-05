'use strict';
angular.module('students').controller('StudentsController', ['$scope', '$location', '$stateParams', '$state', '$http', 'Students',
  function($scope, $location, $stateParams, $state, $http, Students){
    $scope.listings = [];

    // Calculates current season so current season can be accessed from any student page at any time 
    var date = new Date();
    if (date.getMonth() <= 5){
      $scope.currentSeason = 'Spring ' + date.getFullYear(); //spring
    }
    else if(date.getMonth() >=6){
      $scope.currentSeason = 'Fall ' + date.getFullYear(); //fall
    }

    // Fetches all students
    $scope.find = function() {
      /* set loader*/
      $scope.loading = true;

      /* Get all the Students, then bind it to the scope */
      Students.getAll().then(function(response) {
      $scope.loading = false; //remove loader
      $scope.listings = response.data;

      //Season's filter
      $scope.seasons = []; //array of seasons
      for(var i = 0; i < $scope.listings.length;i++){
        //if it doesnt exist inside of the seasons, add it to seasons
        if($scope.listings[i].season && $scope.seasons.indexOf($scope.listings[i].season) === -1){
          $scope.seasons.push($scope.listings[i].season);
        }
      }
      //$scope.filterSeason = $scope.seasons[$scope.seasons.length - 1];
      $scope.filterSeason = $scope.currentSeason;
    }, function(error) {
      $scope.loading = false;
      $scope.error = 'Unable to retrieve Students!\n' + error;
    });

    };

    // Returns to previous state with previous parameters
    $scope.back = function(){
      $state.go($state.previous.state.name, $state.previous.params);
    };

    //set the sort filter to it's default first
    $scope.sort = "-created_at";

    //pagination of candidates
    //sets default value of current entries to 10
    $scope.currentPage = 1;
    $scope.pageSize = "10";

    //Moves forward a season
    $scope.changeSeasons = function(){
      var currentSeason = $scope.student.season;
      var parseCurrentSeason = currentSeason.split(" ");
      var newYear = parseCurrentSeason[1];
      var nYear = parseInt(newYear) + 1;
      var sYear = String(nYear);

      //if it was originally fall, then make it to spring but increase the year by 1
      if(parseCurrentSeason[0] === "Fall"){
       $scope.student.season = "Spring " + nYear; 
     }
      //if it is spring, just change it to fall but keep the current year
      else{
        $scope.student.season = "Fall " + parseCurrentSeason[1];
      }

      //updates the change properly
      Students.update($scope.student._id, $scope.student).then(function(reponse){
        //Season is successfully changed
      }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to save student!\n' + error;
              });

    };
    
     // Moves backwards a season
     $scope.goBackSeasons = function(){
      var currentSeason = $scope.student.season;
      var parseCurrentSeason = currentSeason.split(" ");
      //console.log(parseCurrentSeason[1] - 1);
      var newYear = parseCurrentSeason[1] - 1;

      //if it was originally fall, then make it to spring but decrease the year by 1
      if(parseCurrentSeason[0] === "Fall"){
       $scope.student.season = "Spring " + parseCurrentSeason[1]; 
     }
      //if it is spring, just change it to fall but keep the current year
      else{
        $scope.student.season = "Fall " + newYear;
      }

      //updates the change properly
      Students.update($scope.student._id, $scope.student).then(function(reponse){
        //Season is successfully changed
      }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to save student!\n' + error;
              });

    };


    // Opens a mailto email for all student emails selected
    $scope.bulkEmail = function(){
     var emails = "";
     var q;


     if($scope.all){
       for(q=0 ; q <$scope.listings.length; q++){
         emails += $scope.listings[q].email + ",";
       }
     }

     else{

      for(q= 0; q < $scope.listings.length; q++){
        if($scope.listings[q].selected)
          emails += $scope.listings[q].email + ",";
      }
    }
    console.log(emails);
    var a = document.getElementById("xyz");
    a.href="mailto:?bcc=" + emails;
   };

      //filtering function
      //sets it to any by default for the any option
      $scope.filter = "any";
      // Filter function based on the various filter and search query
      $scope.customFilter = function(student){
      
      if(($scope.filterSeason && $scope.filterSeason.toUpperCase() === student.season.toUpperCase())&& (student.inline===false)){
        if(!$scope.query){
          return true;
        }
        else if($scope.filter === "any"){
          return (student.major.toUpperCase().indexOf($scope.query.toUpperCase() || '') !== -1) || 
          (student.firstName.toUpperCase().indexOf($scope.query.toUpperCase() || '') !== -1) ||
          (student.lastName.toUpperCase().indexOf($scope.query.toUpperCase() || '') !== -1)  ;
        }
        else if($scope.filter === "name"){
          return (student.firstName.toUpperCase().indexOf($scope.query.toUpperCase() || '') !== -1) ||
          (student.lastName.toUpperCase().indexOf($scope.query.toUpperCase() || '') !== -1);
        }
        else if($scope.filter === "major"){
          return student.major.toUpperCase().indexOf($scope.query.toUpperCase() || '') !== -1;
        }
      }
    };

    
    function isEmpty(str){
      return !str.replace(/^\s+/g, '').length; // boolean (`true` if field is empty)
    }

    // Create a student from the form information
    $scope.create = function(isValid) {
      $scope.error = null;


      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'registerForm');

        return false;
      }

          //Season attachment to student when they are created
          var season =  $scope.currentSeason;

          //change whatever format the phone number is to just 10 digits
          var phone = $scope.phonenumber.replace(/[- )(]/g,'');

          //More important to save what is required
          var student = {
            firstName: $scope.firstName,
            lastName: $scope.lastName,

            email: $scope.email,
            major: $scope.major,
            minor: $scope.minor,
            gpa: $scope.gpa,
            phone: phone,
            fulltime: $scope.fulltime,
            season : season
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

        // Fetch a specific student
        $scope.findOne = function() {
          $scope.loading = true;

          var id = $stateParams.studentId;

          Students.read(id)
          .then(function(response) {
            // Read the saved recruiter rating information
            var fulltime = response.data.fulltime;
            var leadership =response.data.recruiterComments.leadership;
            var behavior =response.data.recruiterComments.behavior;
            var communication =response.data.recruiterComments.communication;
            var critThinking =response.data.recruiterComments.critThinking;
            var techKnowledge =response.data.recruiterComments.techKnowledge;
            var candidacy =response.data.recruiterComments.candidacy;
            
            // Set the recruiter details radios
            $('input[name=fulltimeRadios][value='+fulltime+']').prop('checked',true);
            $('input[name=leadershipRadios][value='+leadership+']').prop('checked',true);
            $('input[name=behaviorRadios][value='+behavior+']').prop('checked',true);
            $('input[name=communicationRadios][value='+communication+']').prop('checked',true);
            $('input[name=critThinkingRadios][value='+critThinking+']').prop('checked',true);
            $('input[name=techKnowledgeRadios][value='+techKnowledge+']').prop('checked',true);
            $('input[name=candidacyRadios][value='+candidacy+']').prop('checked',true);

            $scope.student = response.data;
            $scope.loading = false;
          }, function(error) {
            $scope.error = 'Unable to retrieve student with id "' + id + '"\n' + error;
            $scope.loading = false;
          });
        };

        // Updates an individual student
      $scope.update = function(isValid) {
        //debugger;candidacy
        $scope.loading = true;
        var id = $stateParams.studentId;

        if (!isValid) {
          $scope.$broadcast('show-errors-check-validity', 'articleForm');
          return false;
        }

        $scope.student.fulltime =  ((document.querySelector('input[name=fulltimeRadios]:checked')===null)?0:document.querySelector('input[name=fulltimeRadios]:checked').value);
        $scope.student.recruiterComments.leadership =  ((document.querySelector('input[name=leadershipRadios]:checked')===null)?0:document.querySelector('input[name=leadershipRadios]:checked').value);
        $scope.student.recruiterComments.behavior = ((document.querySelector('input[name=behaviorRadios]:checked')===null)?0:document.querySelector('input[name=behaviorRadios]:checked').value);
        $scope.student.recruiterComments.communication = ((document.querySelector('input[name=communicationRadios]:checked')===null)?0:document.querySelector('input[name=communicationRadios]:checked').value);
        $scope.student.recruiterComments.critThinking =  ((document.querySelector('input[name=critThinkingRadios]:checked')===null)?0:document.querySelector('input[name=critThinkingRadios]:checked').value);
        $scope.student.recruiterComments.techKnowledge =  ((document.querySelector('input[name=techKnowledgeRadios]:checked')===null)?0:document.querySelector('input[name=techKnowledgeRadios]:checked').value);
        $scope.student.recruiterComments.candidacy =  ((document.querySelector('input[name=candidacyRadios]:checked')===null)?0:document.querySelector('input[name=candidacyRadios]:checked').value);
        $scope.student.inline = false;
        console.log("Test?");

        Students.update(id, $scope.student).then(function(reponse){
          $scope.loading=false;
          alert($scope.student.firstName + " saved!");
        }, function(error) {
                //otherwise display the error
                $scope.loading=false;
                $scope.error = 'Unable to save student!\n' + error;
              });
      };

      // Updates student and goes to interview selection page
      $scope.submitForInterview = function() {
        $scope.loading = true;
        var id = $stateParams.studentId;


        $scope.student.fulltime =  ((document.querySelector('input[name=fulltimeRadios]:checked')===null)?0:document.querySelector('input[name=fulltimeRadios]:checked').value);
        $scope.student.recruiterComments.leadership =  ((document.querySelector('input[name=leadershipRadios]:checked')===null)?0:document.querySelector('input[name=leadershipRadios]:checked').value);
        $scope.student.recruiterComments.behavior = ((document.querySelector('input[name=behaviorRadios]:checked')===null)?0:document.querySelector('input[name=behaviorRadios]:checked').value);
        $scope.student.recruiterComments.communication = ((document.querySelector('input[name=communicationRadios]:checked')===null)?0:document.querySelector('input[name=communicationRadios]:checked').value);
        $scope.student.recruiterComments.critThinking =  ((document.querySelector('input[name=critThinkingRadios]:checked')===null)?0:document.querySelector('input[name=critThinkingRadios]:checked').value);
        $scope.student.recruiterComments.techKnowledge =  ((document.querySelector('input[name=techKnowledgeRadios]:checked')===null)?0:document.querySelector('input[name=techKnowledgeRadios]:checked').value);
        $scope.student.recruiterComments.candidacy =  ((document.querySelector('input[name=candidacyRadios]:checked')===null)?0:document.querySelector('input[name=candidacyRadios]:checked').value);
        $scope.student.inline = false;

        Students.update(id, $scope.student).then(function(reponse){

          $scope.loading=false;
          $state.go('employeeDashboard.selectForInterview',{studentId: id });
        }, function(error) {
                //otherwise display the error
                $scope.loading=false;
                $scope.error = 'Unable to save student!\n' + error;
              });
      };

      // Deletes a specific student
      $scope.remove = function() {
        if (!confirm("Delete this student?"))
        {
          return;
        }

        $scope.loading = true;
        confirm("Are you sure you want to delete this student?");

        var id = $stateParams.studentId;
        Students.delete(id)
        .then(function(response) {
          $scope.loading = false;
          $state.go('employeeDashboard.employeeCandidateList', {sucessMessage: 'Student successfully deleted!'});
        }, function(error) {
          $scope.error = 'Unable to delete student with id "' + id + '"\n' + error;
          $scope.loading = false;
        });
      };

      $scope.deleteFromList = function (student) {
        var student_to_delete = student;
        var id=student_to_delete._id;
        var index= $scope.listings.indexOf(student);


        Students.delete(id).then (function (success) {
          $scope.listings.splice(index, 1);
        });
      };


      /* Bind the success message to the scope if it exists as part of the current state */
      if($stateParams.successMessage) {
        $scope.success = $stateParams.successMessage;
      }

  }
]).filter('startFrom', function(){
  return function(data,start){
    if (!data || !data.length) {return;}
    start = 0 + start;
    return data.slice(start);
  };
})
.filter('reverse', function(){
  return function(items){
    if (!items || !items.length) {return;}
    return items.slice().reverse();
  };
});

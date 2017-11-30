'use strict';
angular.module('students').controller('StudentsController', ['$scope', '$location', '$stateParams', '$state', '$http', 'Students',
  function($scope, $location, $stateParams, $state, $http, Students){
    $scope.listings = [];

    // Calculate current season
    var date = new Date();
    if (date.getMonth() <= 5){
      $scope.currentSeason = 'Spring ' + date.getFullYear(); //spring
    }
    else if(date.getMonth() >=6){
      $scope.currentSeason = 'Fall ' + date.getFullYear(); //fall
    }

    //gets all of the students
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

  //set the sort filter to it's default first
  $scope.sort = "-created_at";

  //pagination of candidates
    //sets default value of current entries to 10
  $scope.currentPage = 1;
  $scope.pageSize = "10";

  //button function to change the season to the next one
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
  
   //button to go back by one season
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
  $scope.customFilter = function(student){
    //I need a default any for filters and then I need a season filter, but we don't have that variable in the model yet
    //Case insensitive
    //checks if the search bar is currently null. If so, just load everything in the
    //student database anyways

    if($scope.filterSeason && $scope.filterSeason.toUpperCase() === student.season.toUpperCase()){
        if(!$scope.query){
          return true;
        }
        else if($scope.filter === "any"){
          return (student.major.toUpperCase().indexOf($scope.query.toUpperCase() || '') !== -1) || 
                 (student.name.toUpperCase().indexOf($scope.query.toUpperCase() || '') !== -1) ;
        }
        else if($scope.filter === "name"){
          return student.name.toUpperCase().indexOf($scope.query.toUpperCase() || '') !== -1;
        }
        else if($scope.filter === "major"){
          return student.major.toUpperCase().indexOf($scope.query.toUpperCase() || '') !== -1;
        }
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

        //Season attachment to student when they are created
        var season =  $scope.currentSeason;
        // var date = new Date();
        // //for later testing
        // //var date = new Date("February, 20, 2017 01:15:00");

        // if (date.getMonth() <= 5){
        //   season = 'Spring ' + date.getFullYear(); //spring
        // }
        // else if(date.getMonth() >=6){
        //   season = 'Fall ' + date.getFullYear(); //fall
        // }


        //More important to save what is required
        var student = {
          name: $scope.name,
          email: $scope.email,
          major: $scope.major,
          minor: $scope.minor,
          gpa: $scope.gpa,
          phone: $scope.phonenumber,
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


    $scope.findOne = function() {
      //debugger;
      $scope.loading = true;

      var id = $stateParams.studentId;

      Students.read(id)
      .then(function(response) {
        
        if(response.data.fulltime)
          response.data.fulltime = 'Fulltime';       
        else 
          response.data.fulltime = 'Internship';
        $scope.student = response.data;
        $scope.loading = false;
      }, function(error) {  
        $scope.error = 'Unable to retrieve student with id "' + id + '"\n' + error;
        $scope.loading = false;
      });
    };
    $scope.displayEditForm = function() {
      //debugger;
      $scope.loading = true;

      var id = $stateParams.studentId;

      Students.read(id)
      .then(function(response) {
        var fulltime = response.data.fulltime;
        var leadership =response.data.recruiterComments.leadership;
        var behavior =response.data.recruiterComments.behavior;
        var communication =response.data.recruiterComments.communication;
        var critThinking =response.data.recruiterComments.critThinking;
        var techKnowledge =response.data.recruiterComments.techKnowledge;
        var candidacy =response.data.recruiterComments.candidacy;
        
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


  
    $scope.update = function(isValid) {
      //debugger;candidacy
      $scope.loading = true;
      var id = $stateParams.studentId;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');
        return false;
      }

      $scope.student.fullTime =  ((document.querySelector('input[name=fulltimeRadios]:checked')===null)?0:document.querySelector('input[name=fulltimeRadios]:checked').value);
      $scope.student.recruiterComments.leadership =  ((document.querySelector('input[name=leadershipRadios]:checked')===null)?0:document.querySelector('input[name=leadershipRadios]:checked').value);
      $scope.student.recruiterComments.behavior = ((document.querySelector('input[name=behaviorRadios]:checked')===null)?0:document.querySelector('input[name=behaviorRadios]:checked').value);
      $scope.student.recruiterComments.communication = ((document.querySelector('input[name=communicationRadios]:checked')===null)?0:document.querySelector('input[name=communicationRadios]:checked').value);
      $scope.student.recruiterComments.critThinking =  ((document.querySelector('input[name=critThinkingRadios]:checked')===null)?0:document.querySelector('input[name=critThinkingRadios]:checked').value);
      $scope.student.recruiterComments.techKnowledge =  ((document.querySelector('input[name=techKnowledgeRadios]:checked')===null)?0:document.querySelector('input[name=techKnowledgeRadios]:checked').value);
      $scope.student.recruiterComments.candidacy =  ((document.querySelector('input[name=candidacyRadios]:checked')===null)?0:document.querySelector('input[name=candidacyRadios]:checked').value);
    
    Students.update(id, $scope.student).then(function(reponse){

      $scope.loading=false;
      $state.go('employeeDashboard.employeeCandidateList', { successMessage: 'Student succesfully updated!' });
    }, function(error) {
              //otherwise display the error
              $scope.loading=false;
              $scope.error = 'Unable to save student!\n' + error;
      });
  };

    $scope.remove = function() {
        if (!confirm("Delete this student?"))
        {
          return;
        }

        $scope.loading = true;

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

      /* Bind the success message to the scope if it exists as part of the current state */
      if($stateParams.successMessage) {
        $scope.success = $stateParams.successMessage;
      }

  }//end of function
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

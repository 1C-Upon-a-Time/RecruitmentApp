"use strict";
angular.module('calendar').factory('InterviewSlots', ['$http', 
  function($http) {
    var methods = {
      //Get all of the interviewSlot's information and provide it into object of listings
      getAll: function() {
        return $http.get("/api/employee/viewInterviewSlots");
      },
      //Create a new interviewSlot into the database
      create: function(interviewSlot) {
        return $http.post('/api/employee/interviewSlot', interviewSlot);
      },
      delete: function(id){
        return $http.delete('/api/employee/slot/' + id);
      },
      bulkCreate: function(interviewSlots){
        return $http.post('/api/employee/bulkInterviewSlots', interviewSlots);
      },
      update: function(id, interviewSlot) {
        return $http.put('/api/employee/slot/' + id, interviewSlot);
      },
      getRecruiters: function(){
        return $http.get('/api/users/recruiters');
      },
      updateInterviews: function(user) {
        return $http.put('/api/users/interviews');
      }

      // read: function(id) {
      //   return $http.get('/api/listings/' + id);
      // }, 

      // delete: function(id) {
      //   return $http.delete('/api/listings/' + id);
      // }
    };

    return methods;
  }
]);
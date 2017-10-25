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
      update: function(id, interviewSlot) {
        return $http.put('/api/employee/slot/' + id, interviewSlot);
      }

      // read: function(id) {
      //   return $http.get('/api/listings/' + id);
      // }, 

      // update: function(id, listing) {
      //   return $http.put('/api/listings/' + id, listing);
      // }, 

      // delete: function(id) {
      //   return $http.delete('/api/listings/' + id);
      // }
    };

    return methods;
  }
]);
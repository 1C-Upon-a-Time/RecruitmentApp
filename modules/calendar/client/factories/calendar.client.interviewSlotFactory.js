"use strict";
angular.module('calendar').factory('InterviewSlots', ['$http', 
  function($http) {
    var methods = {
      //Get all of the interviewSlot's information and provide it into a listing
      getAll: function() {
        return $http.get("/api/employee/viewInterviewSlots");
      },
      //Create a new interviewSlot into the database
      create: function(interviewSlot) {
        return $http.post('/api/employee/interviewSlot', interviewSlot);
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
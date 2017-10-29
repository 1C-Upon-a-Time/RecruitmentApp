"use strict";
angular.module('students').factory('Students', ['$http', 
  function($http) {
    var methods = {
      //Get all of the student's information and provide it into a listing
      getAll: function() {
        return $http.get("/api/employee/viewList");
      },
      //Create a new student into the database
      create: function(student) {
        return $http.post('/api/register', student);
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
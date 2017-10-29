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
      },

      read: function(id) {
         return $http.get('/api/employee/student/' + id);
       }, 
    delete: function(id) {
       return $http.delete('/api/employee/student/' + id);
     },

      update: function(id, student) {
        return $http.put('/api/employee/student/' + id, student);
      }
    };

    return methods;
  }
]);
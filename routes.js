angular.module('student').config(['$stateProvider', '$urlRouterProvider',

  function($stateProvider){
    $stateProvider
      .state('home',{
      url:'/home',
      abstract: true,
      templateURL: TODO
    })
    .state('student.register',{
      url:'student/register',
      templateUrl:TODO
    })

  }]);

angular.module('employee').config([$stateProvider, '$urlRouterProvider',{
    function($stateProvider){
      $stateProvider

      .state('employee.signUp',{
        url:'/employee/signUp'
        templateUrl: TODO
      })
      .state('employee.logIn',{
        url:'/employee/logIn'
        templateUrl: TODO
      })
      .state('employee.viewList',{  //will display a list of all canidates filter options on screen
        url: '/employee/viewList'
        templateUrl: TODO
      })
      .state('employee.viewOne',{
        url: /employee/:studentID
        templateUrl: TODO

      })

    }
}]);

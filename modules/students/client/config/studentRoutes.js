"use strict"
angular.module('student').config(['$stateProvider', '$urlRouterProvider',

  function($stateProvider){
    $stateProvider
      .state('home',{
      url:'/home',
      templateURL: 'index.html'
    })
    .state('register',{
      url:'/register',
      templateUrl: 'register.html'
    });

  }]);
/*
angular.module('employee').config(['$stateProvider', '$urlRouterProvider',{
    function($stateProvider){
      $stateProvider

      .state('employee',{
        abstract: true,
        url:'/employee'
        //templateUrl:
      })

      .state('employee.signUp',{
        url:'/employee/signUp',
        templateUrl: TODO
      })
      .state('employee.logIn',{
        url:'/employee/logIn',
        templateUrl: TODO
      })
      .state('employee.crossRoad',{
        url:'/employee/crossRoad',
        templateUrl: TODO
      })
      .state('employee.viewList',{  //will display a list of all canidates filter options on screen
        url: '/employee/viewList'
        templateUrl: TODO
                                    // can filter students by date registered
                                    //so that we can find students currently at career fair

      })
      .state('employee.viewOne',{
        url: '/employee/:studentID'
        templateUrl: TODO
      })
      .state('employee.email',{
        url:'/employee/email',
        templateUrl: TODO
      })
      .state('employee.viewCalander',{
        url:'/employee/viewCalander',
        templateUrl: TODO
      })
      .state('employee.addInterview',{
        url:'employee/addInterview',
        templateUrl: TODO
      })
      .state('employee.settings',{
        url :'employee/settings',
        templateUrl: TODO
      })
    }


    angular.module('admin').config(['$stateProvider', '$urlRouterProvider',{
      function($stateProvider){
        $stateProvider
        .state('admin',{
          abstract: true,
          url:'/admin'
          //templateUrl:
        })

        .state('admin.calander',{// assign days and number of employees for interviews
          url:'admin/calander',
          templateUrl: TODO
        })
        .state('admin.assignInterview',{ // divide student's time blocks among employees
            url:'/admin/assingInteriew',
            template:TODO
        })
        .state('admin.viewEmployeeList',{ // displays all employees in a database
          url:'/admin/viewEmployeeList',
          template: TODO
        })
        .state('admin.viewEmployeeOne',{ // allows showing details and deletion of individual accounts
          url:'/admin/viewEmployeeOne',
          template: TODO
        })

      }
    }
    ])
}]);*/

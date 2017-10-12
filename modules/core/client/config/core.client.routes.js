'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing, Mean's default
    $stateProvider
    // .state('home', {
    //   url: '/',
    //   templateUrl: 'modules/core/client/views/home.client.view.html'
    // })

    //This is our home page.
    .state('home', {
      url: '/',
      templateUrl: 'modules/core/client/views/index.client.view.html'
    })
    .state('studentsSubmit', {
      url: '/studentRegister',
      templateUrl: 'modules/core/client/views/studentsViews/register.html'
    })
    .state('employeeLogin', {
      url: '/login',
      templateUrl: 'modules/core/client/views/studentsViews/login.html'
    })
    .state('employeeSignup', {
      url: '/signup',
      templateUrl: 'modules/core/client/views/studentsViews/signup.html'
    })


    //TESTINGSSSSS
    .state('test', {
      url: '/test',
      templateUrl: 'modules/core/client/views/studentsViews/testStudentsList.html'
    })


    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);

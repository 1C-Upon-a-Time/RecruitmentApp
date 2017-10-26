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

    .state('full', {
      abstract: true,
      templateUrl: 'modules/core/client/views/layouts/full.html'
    })
    .state('square', {
      abstract: true,
      templateUrl: 'modules/core/client/views/layouts/square.html'
    })

    .state('square.studentLanding', {
      url: '/',
      templateUrl: 'modules/core/client/views/studentViews/landing.html'
    })
    .state('square.studentForm', {
      url: '/form',
      templateUrl: 'modules/core/client/views/studentViews/form.html'
    })
    .state('square.studentConfirmation', {
      url: '/confirmation',
      templateUrl: 'modules/core/client/views/studentViews/confirmation.html'
    })

    // Auth
    .state('square.employeeLogin', {
      url: '/login',
      templateUrl: 'modules/core/client/views/auth/login.html'
    })
    .state('square.employeeSignup', {
      url: '/signup',
      templateUrl: 'modules/core/client/views/auth/signup.html'
    })
    .state('square.employeeForgot', {
      url: '/forgot',
      templateUrl: 'modules/core/client/views/auth/forgot.html'
    })
    // .state('employeeForgot', {
    //   url: '/reset/:key',
    //   templateUrl: 'modules/core/client/views/auth/forgot.html'
    // })

    .state('full.employeeDashboard', {
      url: '/dashboard',
      templateUrl: 'modules/core/client/views/employeeViews/dashboard.html'
    })
    .state('full.employeeCandidateList', {
      url: '/candidates',
      templateUrl: 'modules/core/client/views/employeeViews/candidateList.html'
    })
    .state('full.employeeInterviewList', {
      url: '/interviews',
      templateUrl: 'modules/core/client/views/employeeViews/interviewList.html'
    })
    .state('full.employeeStudentDetails', {
      url: '/:studentId', 
      templateUrl: 'modules/core/client/views/employeeViews/studentDetails.html'
    })
    .state('full.studentUpdateForm',{
      url:'/update/:studentId',
      templateUrl: 'modules/core/client/views/employeeViews/studentUpdateForm.html'
    })
    .state('bad-request', {
      url: '/400',
      templateUrl: 'modules/core/client/views/errors/400.html',
      data: {
        ignoreState: true
      }
    })
    .state('unauthorized', {
      url: '/401',
      templateUrl: 'modules/core/client/views/errors/401.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/403',
      templateUrl: 'modules/core/client/views/errors/403.html',
      data: {
        ignoreState: true
      }
    })
    .state('not-found', {
      url: '/404',
      templateUrl: 'modules/core/client/views/errors/404.html',
      data: {
        ignoreState: true
      }
    })
    .state('internal-server-error', {
      url: '/500',
      templateUrl: 'modules/core/client/views/errors/500.html',
      data: {
        ignoreState: true
      }
    });
  }
]);

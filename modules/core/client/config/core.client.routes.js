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

    $stateProvider

<<<<<<< HEAD
    // Templates
    .state('layout-full', {
      abstract: true,
      templateUrl: '/modules/core/client/views/layout-full.client.view.html',
      data: {
        roles: ['user', 'admin']
      }
    })
    .state('layout-square', {
      abstract: true,
      templateUrl: '/modules/core/client/views/layout-square.client.view.html'
=======
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
>>>>>>> dev-taylor
    })
    .state('square.employeeForgot', {
      url: '/forgot',
      templateUrl: 'modules/core/client/views/auth/forgot.html'
    })
    // .state('employeeForgot', {
    //   url: '/reset/:key',
    //   templateUrl: 'modules/core/client/views/auth/forgot.html'
    // })

<<<<<<< HEAD
    // Views
    .state('home', {
      url: '/',
      templateUrl: 'modules/core/client/views/home.client.view.html',
      parent: 'layout-square'
    })

    // Errors
    .state('not-found', {
      url: '/404',
      templateUrl: 'modules/core/client/views/errors/404.client.view.html',
=======
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

    .state('bad-request', {
      url: '/400',
      templateUrl: 'modules/core/client/views/errors/400.html',
>>>>>>> dev-taylor
      data: {
        ignoreState: true
      }
    })
<<<<<<< HEAD
    .state('bad-request', {
      url: '/400',
      templateUrl: 'modules/core/client/views/errors/400.client.view.html',
=======
    .state('unauthorized', {
      url: '/401',
      templateUrl: 'modules/core/client/views/errors/401.html',
>>>>>>> dev-taylor
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/403',
<<<<<<< HEAD
      templateUrl: 'modules/core/client/views/errors/403.client.view.html',
=======
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
>>>>>>> dev-taylor
      data: {
        ignoreState: true
      }
    });
  }
]);

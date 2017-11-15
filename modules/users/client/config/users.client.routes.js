'use strict';

// Setting up route
angular.module('users').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/candidates');

    $stateProvider
    // Layout
    .state('layout-full', {
      abstract: true,
      templateUrl: '/modules/core/client/views/layouts/layout-full.client.view.html',
      data: {
        roles: ['user', 'admin']
      }
    })

    // Dashboard Views
    .state('employeeDashboard', {
      url: '/dashboard',
      template: '<ui-view/>',
      parent: 'layout-full'
    })
    .state('employeeDashboard.employeeCandidateList', {
      url: '/candidates',
      templateUrl: 'modules/core/client/views/employeeViews/candidateList.html'
    })
    .state('employeeDashboard.employeeInterviewList', {
      url: '/interviews',
      templateUrl: 'modules/core/client/views/employeeViews/interviewList.html'
    })
    .state('employeeDashboard.appSettings', {
      url: '/appSettings',
      templateUrl: 'modules/core/client/views/employeeViews/appSettings.html'
    })
    .state('employeeDashboard.selectForInterview', {
      url: '/interviews/:studentId',
      templateUrl: 'modules/core/client/views/employeeViews/interviewList.html'
    })
    .state('employeeDashboard.studentProfile', {
      url: '/:studentId', 
      templateUrl: 'modules/core/client/views/employeeViews/studentDetails.html'
    })
    .state('employeeDashboard.studentUpdateForm',{
      url:'/update/:studentId',
      templateUrl: 'modules/core/client/views/employeeViews/studentUpdateForm.html'
    })

    // Settings Views
    .state('settings', {
      abstract: true,
      url: '/settings',
      templateUrl: 'modules/users/client/views/settings/settings.client.view.html',
      parent: 'layout-full'
    })
    .state('settings.profile', {
      url: '/profile',
      templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html'
    })
    .state('settings.password', {
      url: '/password',
      templateUrl: 'modules/users/client/views/settings/change-password.client.view.html'
    })
    .state('settings.accounts', {
      url: '/accounts',
      templateUrl: 'modules/users/client/views/settings/manage-social-accounts.client.view.html'
    })
    .state('settings.picture', {
      url: '/picture',
      templateUrl: 'modules/users/client/views/settings/change-profile-picture.client.view.html'
    })

    // Authentication Views
    .state('authentication', {
      abstract: true,
      url: '/authentication',
      template: '<ui-view/>',
      parent: 'layout-square',
    })
    .state('authentication.signup', {
      url: '/signup',
      templateUrl: 'modules/users/client/views/authentication/signup.client.view.html'
    })
    .state('authentication.signin', {
      url: '/signin?err',
      templateUrl: 'modules/users/client/views/authentication/signin.client.view.html'
    })

    // Password Reset Views
    .state('password', {
      abstract: true,
      url: '/password',
      template: '<ui-view/>',
      parent: 'layout-square'
    })
    .state('password.forgot', {
      url: '/forgot',
      templateUrl: 'modules/users/client/views/password/forgot-password.client.view.html'
    })
    .state('password.reset', {
      abstract: true,
      url: '/reset',
      template: '<ui-view/>'
    })
    .state('password.reset.invalid', {
      url: '/invalid',
      templateUrl: 'modules/users/client/views/password/reset-password-invalid.client.view.html'
    })
    .state('password.reset.success', {
      url: '/success',
      templateUrl: 'modules/users/client/views/password/reset-password-success.client.view.html'
    })
    .state('password.reset.form', {
      url: '/:token',
      templateUrl: 'modules/users/client/views/password/reset-password.client.view.html'
    });
  }
]);

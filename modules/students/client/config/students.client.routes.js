'use strict';

// Setting up route
angular.module('students').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $stateProvider
    
    // Form Views
    .state('form', {
      abstract: true,
      url: '/form',
      template: '<ui-view/>',
      parent: 'layout-square'
    })
    .state('form.submit', {
      url: '',
      templateUrl: 'modules/students/client/views/form.client.view.html'
    })
    .state('form.confirmation', {
      url: '/confirmation',
      templateUrl: 'modules/students/client/views/confirmation.client.view.html'
    });
  }
]);

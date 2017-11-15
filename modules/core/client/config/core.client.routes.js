'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

      if (hasTrailingSlash) {
        // if last character is a slash, return the same url without the slash
        var newPath = path.substr(0, path.length - 1);
        $location.replace().path(newPath);
      }
    });

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    $stateProvider
    // Templates
    .state('layout-square', {
      abstract: true,
      templateUrl: '/modules/core/client/views/layouts/layout-square.client.view.html'
    })

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
    })
    .state('bad-request', {
      url: '/400',
      templateUrl: 'modules/core/client/views/errors/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/403',
      templateUrl: 'modules/core/client/views/errors/403.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);

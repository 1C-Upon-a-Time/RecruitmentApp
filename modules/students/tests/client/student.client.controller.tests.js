(function () {
  'use strict';

  describe('Students Controller Tests', function () {
    // Initialize global variables
    var $scope,
      $httpBackend,
      $state,
      Authentication,
      StudentsController,
      Students,
      student;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _Students_, _$state_, _$httpBackend_, _Authentication_, _ClientmanagementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      Students = _Students_;

      // create mock Clientmanagement
      student = new Students({
        _id: '5a1f036a86daab1300cef241',
        name: 'Luke Bickell',
        major: 'CSE',
        minor: 'BA',
        fulltime: 'false',
        season: 'Fall 2017'
      });

   

      // Initialize the Clientmanagements controller.
      StudentsController = $controller('StudentsController as vm', {
        $scope: $scope
      });
    }));

    describe('scope.find() as create', function () {
    beforeEach(module('Students'));
      it('should find student', inject(function (Students) {
        expect(true).toBe(true);
      }));



    });



    // describe('vm.save() as update', function () {
    //   beforeEach(function () {
        
    //   });

    //   it('should update a valid Clientmanagement', inject(function (ClientmanagementsService) {
        
    //   }));

    //   it('should set $scope.vm.error if error', inject(function (ClientmanagementsService) {
    //     ;
    //   }));
    // });

    // describe('vm.remove()', function () {
    //   beforeEach(function () {
        
    //   });

    //   it('should delete the Clientmanagement and redirect to Clientmanagements', function () {
        
    //   });

    //   it('should should not delete the Clientmanagement and not redirect', function () {
        
    //   });
    // });

  });

}());


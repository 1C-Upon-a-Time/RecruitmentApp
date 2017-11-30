(function(){
  'use strict';

  describe('Student Route Tests', function(){
    // Initialize global variables
    var $stateProvider,
    students,
    $urlRouterProvider,
    StudentsController;

    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    beforeEach(inject(function ($rootScope, _students_){
      // Set a new global scope
      $scope = $rootScope.$new();
      students = _students_;
    }));
  });

  describe('View Route', function(){
    var viewState, students;

    beforeEach(inject(function($controller, $state, $templateCache){
      viewState = $state.get('form');
      $templateCache.put('modules/students/client/views/form.client.view.html');
    }));

    StudentsController = $controller('StudentsController as vm', {
      $scope: scope
    });

    it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/form');
        });

        it('Should submit the form', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.inventorymanagementResolve).toEqual('function');
        });

        it('should switch to confirmation URL', inject(function ($state) {
          eexpect(viewstate.url).toEqual('/form');
        }));
  });
});

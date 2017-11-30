'use strict';

(function() {
  // Students Controller Spec
  describe('StudentsController', function () {
    // Initialize global variables
    var StudentsController,
        $scope,
        $location,
        $stateParams,
        $state,
        $http,
        Students;

// MAYBE???
        beforeEach(function() {
          jasmine.addMatchers({
            toEqualData: function(util, customEqualityTesters) {
              return {
                compare: function(actual, expected) {
                  return {
                    pass: angular.equals(actual, expected)
                  };
                }
              };
            }
          });
        });
// MAYBE???

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        describe('Testing Students Controller', function(){
          // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
          // This allows us to inject a service but then attach it to a variable
          // with the same name as the service.
          beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
            // Set a new global scope
            scope = $rootScope.$new();

            // Point global variables to injected services
            $stateParams = _$stateParams_;
            $httpBackend = _$httpBackend_;
            $location = _$location_;
            StudentController = _StudentController_;

            Sudents = new StudentController({
              _id: '5a1f036a86daab1300cef241',
              name: "Luke Bickell",
              email: "lb@ufl.edu",
              major: "CSE",
              minor: "BA",
              fulltime: false,
              season: "Fall 2017"
            });

          // Initialize the Student controller
          StudentsController = $controller('StudentsController as vm', {
            $scope: scope
          });
        }));
// FIND
        describe('vm.find()', function () {
          it('should find student name', function(){
            vm.find(true);
            expect(vm.name).toBe("Luke Bickell");
          });
          it('should find student email', function(){
            vm.find(true);
            expect(vm.email).toBe("lb@ufl.edu");
          });
          it('should find student major', function(){
            vm.find(true);
            expect(vm.major).toBe("CSE");
          });
          it('should find student minor', function(){
            vm.find(true);
            expect(vm.minor).toBe("BA");
          });
          it('should find student fulltime', function(){
            vm.find(true);
            expect(vm.fulltime).toBe(false);
          });
          it('should find student season', function(){
            vm.find(true);
            expect(vm.season).toBe("Fall 2017");
          });
        });
// CHANGE SEASONS
        describe('vm.changeSeasons()', function () {
          var maySeason = "Spring 2018";
          var seasonBtn;
          beforeEach(function() {
            seasonBtn = $("input#myButton").eq(0);
          });
          it("should call click function", function(){
            seasonBtn.trigger("click");
            expect(vm.season).toBe(maySeason);
          });
        });
// GO BACK SEASONS
        describe('vm.goBackSeasons()', function () {
          var maySeason = "Spring 2017";
          var seasonBtn;
          beforeEach(function() {
            seasonBtn = $("input#myButton").eq(0);
          });
          it("should call click function", function(){
            seasonBtn.trigger("click");
            expect(vm.season).toBe(maySeason);
          });
        });
// BULK EMAIL, unsure
        describe('vm.bulkEmail()', function () {
          var emailList;

          beforeEach(funtion(){
            emailList = [student, student];
          });
          it('should contain those selected', inject(function (student){
            // Set POST response
            $httpBackend.expectGET('api/emailCheckbox').respond(emailList);
            $httpBackend.flush();

            // Test form inputs are reset
            expect(vm.emailList.length).toEqual(0);
          }));
        });
// CUSTOM FILTER
        describe('vm.customFilter()', function () {
          var filters = ["any", "name", "major"];
          it('should filter any', function(){
            var currentC; //current choice
            expect(currentC).toEqual(a[0]);
          });
          it('should filter name', funcion(){
            var currentC; //current choice
            expect(currentC).toEqual(a[1]);
          });
          it('should filter major', function(){
            var currentC; //current choice
            expect(currentC).toEqual(a[2]);
          });
        });
//CREATE
        describe('vm.create()', function () {
        });

        describe('vm.findOne()', function () {
        }

        describe('vm.displayEditForm()', function () {
        }

        describe('vm.update()', function () {
        }

        describe('vm.remove()', function () {
        }
      });
  });
}());

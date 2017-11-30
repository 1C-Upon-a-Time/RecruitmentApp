describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    browser.get('localhost:3000');

    element(by.css('[class="btn btn-primary btn-lg btn-block"]')).click();

    var nameBox = element(by.css('[ng-model="name"]'));
    nameBox.sendKeys("Test Name");

    element(by.css('[class="btn btn-primary"]'));
  });
});
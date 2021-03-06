'use strict';

describe('Controller: ParkingCtrl', function () {

  // load the controller's module
  beforeEach(module('meanMapApp'));

  var ParkingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ParkingCtrl = $controller('ParkingCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ParkingCtrl.awesomeThings.length).toBe(3);
  });
});

'use strict';

/**
 * @ngdoc overview
 * @name meanMapApp
 * @description
 * # meanMapApp
 *
 * Main module of the application.
 */
angular
  .module('meanMapApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui-leaflet'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/academic', {
        templateUrl: 'views/academic.html',
        controller: 'AcademicCtrl',
        controllerAs: 'academic'
      })
       .when('/parking', {
        templateUrl: 'views/parking.html',
        controller: 'ParkingCtrl',
        controllerAs: 'parking'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

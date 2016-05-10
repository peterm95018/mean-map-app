'use strict';

/**
 * @ngdoc overview
 * @name meanMapApp
 * @description
 * # meanMapApp
 *
 * Main module of the application.
 * Note that $routeProvider entries with controller can cause 
 * controller to fire twice causing odd behavior.
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
        templateUrl: 'views/academic.html'
      })
       .when('/parking', {
        templateUrl: 'views/parking.html'
      })
       .when('/filter', {
        templateUrl: 'views/filter.html'
      })
        .when('/filtercluster', {
        templateUrl: 'views/filtercluster.html'
      })
        .when('/markertest', {
        templateUrl: 'views/markertest.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

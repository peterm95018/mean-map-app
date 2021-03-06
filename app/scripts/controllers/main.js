'use strict';

/**
 * @ngdoc function
 * @name meanMapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the meanMapApp
 */

angular.module('meanMapApp')
.controller("MainCtrl", [ '$scope', function($scope) {
    angular.extend($scope, {
        center: {
            lat: 36.9914, 
            lng: -122.0609,
            zoom: 15
        },
        defaults: {
            scrollWheelZoom: false,
            zoomControlPosition: 'topright'
        }
    });
}]);

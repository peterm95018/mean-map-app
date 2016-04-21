'use strict';

/**
 * @ngdoc function
 * @name meanMapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the meanMapApp
 */
// angular.module('meanMapApp')
//   .controller('MainCtrl', [ '$scope', function ($scope) {
//     // this.awesomeThings = [
//     //   'HTML5 Boilerplate',
//     //   'AngularJS',
//     //   'Karma'
//     // ];

   
//     angular.extend($scope, {
//         defaults: {
//             scrollWheelZoom: false
//         }
//     });

//   }]);

angular.module('meanMapApp')
.controller("MainCtrl", [ '$scope', function($scope) {
    angular.extend($scope, {
        center: {
            lat: 40.095,
            lng: -3.823,
            zoom: 4
        },
        defaults: {
            scrollWheelZoom: false
        }
    });
}]);
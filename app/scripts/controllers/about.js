'use strict';

/**
 * @ngdoc function
 * @name meanMapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the meanMapApp
 */
angular.module('meanMapApp')
  .controller('AboutCtrl', [ '$scope', function ($scope) {
	 angular.extend($scope, {
        center: {
            lat: 36.9956739, 
            lng: -122.0589681,
            zoom: 17
        },
       
        markers: {
            mchenryMarker: {
                lat: 36.9956739,
                lng: -122.0589681,
                message: "McHenry Library",
                focus: true,
                draggable: false,
                icon:  {
                    type: 'awesomeMarker',
                    icon: 'heart',
                    markerColor: 'red'
                    }
                },
            },
        defaults: {
            scrollWheelZoom: false
        }
        
    });

  }]);

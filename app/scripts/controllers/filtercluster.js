'use strict';

/**
 * @ngdoc function
 * @name meanMapApp.controller:FilterclusterCtrl
 * @description
 * # FilterclusterCtrl
 * Controller of the meanMapApp
 */
angular.module('meanMapApp')
  .controller('FilterclusterCtrl', [ '$scope', '$http', 'leafletData', 
  	function ($scope, $http, leafletData) {
	
	// Find and store a variable reference to the list of filters.
var filters = document.getElementById('filters');    

  angular.extend($scope, {
        center: {
          lat: 36.9914, 
          lng: -122.0609,
          zoom: 14
        },
        defaults: {
          scrollWheelZoom: false,
          maxZoom: 22,
          zoomControlPosition: 'topright'
        },
        layers: {
                    baselayers: {
                        osm: {
                        name: 'OpenStreetMap',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        type: 'xyz'
                        },
                    },
                    overlays:{}
                }
});


	  // Get the countries geojson data
	  $http.get("data/bicycle-parking-cafe.geojson")
	  	.success(function(data, status) {
		angular.extend($scope.layers.overlays, {
			cafes: {
				name: 'Cafes',
				type: 'geoJSONAwesomeMarker',
				data: data,
				visible: true,
				icon: {
					icon: 'coffee',
					markerColor: 'red',
					prefix: 'fa'
				}
			}

		});
		
	  }); // end http.get()




	}]);

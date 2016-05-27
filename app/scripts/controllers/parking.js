'use strict';

/**
 * @ngdoc function
 * @name meanMapApp.controller:ParkingCtrl
 * @description
 * # ParkingCtrl
 * Controller of the meanMapApp
 */
angular.module('meanMapApp')
  .controller('ParkingCtrl', [ '$scope', '$http', 'leafletData', 
  	function ($scope, $http, leafletData) {
		// parking.geojson

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
        }
      });

		//var map = L.map('map');

	  $http.get("data/bicycle-parking-cafe.geojson").success(function(data, status) {
		var allstuff = L.geoJson(data);

		var bicycles = L.geoJson(data, {
			filter: function(feature, layer) {
				return feature.properties['marker-symbol'] == 'bicycle';
			}
  		});

  		var cafes = L.geoJson(data, {
  			filter: function(feature, layer) {
  				return feature.properties['marker-symbol'] == 'cafe';
  			}
  		});

  		map.fitBounds(allstuff.getBounds(), {
  			padding: [50, 50]
  		});


  		bicycles.addTo(map);
  		cafes.addTo(map);

  	});

  }]);

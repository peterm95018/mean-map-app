'use strict';

/**
 * @ngdoc function
 * @name meanMapApp.controller:FilterCtrl
 * @description
 * # FilterCtrl
 * Controller of the meanMapApp
 */
angular.module('meanMapApp')
.controller('FilterCtrl',['$scope', '$http', 'leafletData', 
    function($scope, $http, leafletData) {

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
          maxZoom: 22
        }
      });

  // Get the geojson data
  $http.get("data/bicycle-parking-cafe.geojson")
  	.success(function(data, status) {
		var features = data.features;
  		var all_parking_cafes = L.geoJson(features);
  	
  	// create a variable based on filtering the geoJson on cafes
  	var cafes = L.geoJson(data, {
		filter: function(feature, layer) {
			return feature.properties['marker-symbol'] == "cafe";
		}
  	});

	// create a variable based on filtering the geoJson on others
  	var others = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.BusType != "cafe";
            }
        });
		
		// here we can directly work on the map object
  		leafletData.getMap().then(function(map) {
  		var overlayMaps = {
  			"Bicycles": others,
  			"Cafes": cafes
  		}
  		L.control.layers(overlayMaps).addTo(map);
		cafes.addTo(map);
		others.addTo(map);
      });	
	}); // end promise

}]);
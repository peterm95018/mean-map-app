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

	var cafeIcon = L.AwesomeMarkers.icon({
		prefix: 'fa',
		icon: 'coffee',
		markerColor: 'red',
		iconColor: 'white'
	});

  // Get the geojson data
  $http.get("data/bicycle-parking-cafe.geojson")
  	.success(function(data, status) {
	var allpoints = L.geoJson(data);
  	


  	// create a variable based on filtering the geoJson on cafes
  	var cafes = L.geoJson(data, {
		filter: function(feature, layer) {
			return feature.properties['marker-symbol'] == "cafe";
		},
		pointToLayer: function(feature, latlng) {
			return L.marker(latlng, {
				icon: cafeIcon
			// })
			// .on('mouseover', function() {
			// 	this.bindPopup(feature.properties.amenity).openPopup();
			});
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
			map.fitBounds(allpoints.getBounds(), {
				padding: [50, 50]
			});
  			 cafes.addTo(map);
  			 others.addTo(map);

  			 // The JavaScript below is new
        $("#others").click(function() {
            map.addLayer(others)
            map.removeLayer(cafes)
        });
        $("#cafes").click(function() {
            map.addLayer(cafes)
            map.removeLayer(others)
        });
        $("#allbus").click(function() {
            map.addLayer(cafes)
            map.addLayer(others)
        });
      });

	}); // end promise



}]);
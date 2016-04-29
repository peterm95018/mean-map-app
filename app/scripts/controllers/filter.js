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

	var bicycleIcon = L.AwesomeMarkers.icon({
		prefix: 'fa',
		icon: 'bicycle',
		markerColor: 'blue',
		iconColor: 'white'
	});

$scope.map = null;
	leafletData.getMap().then(function(map) {
		$scope.map = map;

});	


  // Get the geojson data
  $http.get("data/bicycle-parking-cafe.geojson").then(function(response, status) {
	var data = response.data;

  	// create a variable based on filtering the geoJson on cafes
    // addTo(map) puts it on the map and selects checkbox in control
  	var cafesLayer = L.geoJson(data, {
		filter: function(feature, layer) {
			return feature.properties['marker-symbol'] == "cafe";
		},
		onEachFeature: function (feature, layer) {
              layer.bindPopup(feature.properties.name);
          },
		pointToLayer: function(feature, latlng) {
			return L.marker(latlng, {
				icon: cafeIcon
			});
		}
  	}).addTo($scope.map);

	// create a variable based on filtering the geoJson on others
  	var bicycleParkingLayer = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.amenity == "bicycle_parking";
            },
            onEachFeature: function (feature, layer) {
              layer.bindPopup(feature.properties.amenity);
          },
            pointToLayer: function(feature, latlng) {
            	return L.marker(latlng, {
            		icon: bicycleIcon
            	});
            }
        });

		

$scope.overlayMaps = {
	"Cafes": cafesLayer,
	"Bicycle Parking": bicycleParkingLayer
};

// Add objects to the map
    // var markers = L.markerClusterGroup();
    // markers.addLayer(bicycleParkingLayer);
    // $scope.map.addLayer(markers);

L.control.layers(null, $scope.overlayMaps, {collapsed:false}).addTo($scope.map);



},
function myError(response) {
	console.log(response.statusText);

	}); // end promise

	

}]);
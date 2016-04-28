'use strict';

/**
 * @ngdoc function
 * @name meanMapApp.controller:MarkertestCtrl
 * @description
 * # MarkertestCtrl
 * Controller of the meanMapApp
 */
angular.module('meanMapApp')
.controller('MarkertestCtrl',['$scope', '$http', 'leafletData', 
    function($scope, $http, leafletData) {
    
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

$scope.map = null;

leafletData.getMap().then(function(map) {
	$scope.map = map;
});


// Get the geojson data
  $http.get("data/test.geojson")
  	// .success(function(data, status) {
  		.then(function(response) {
  			var data = response.data;


	var buildingLayer = L.geoJson(data, {
		filter: function(feature, layer) {
			return feature.properties.amenity == "building";
		}
	});



	var pitchLayer = L.geoJson(data, {
		filter: function(feature, layer) {
			return feature.properties.amenity == "pitch";
		}
	});

	$scope.overlayMaps = {
		"Buildings": buildingLayer,
		"Pitches": pitchLayer
		};

L.control.layers(null, $scope.overlayMaps).addTo($scope.map);
  	},
  	
  	function myError(response) {
  		console.log(response.statusText);
  	});



  }]);

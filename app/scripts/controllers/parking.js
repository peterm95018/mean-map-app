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
		var vm = this;
		  
		vm.center = {
			lat: 36.9914, 
			lng: -122.0609,
			zoom: 14
		};

		vm.defaults = {
		  scrollWheelZoom: false,
		  maxZoom: 22
		};

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

  		// map.fitBounds(allstuff.getBounds(), {
  		// 	padding: [50, 50]
  		// });


  		// bicycles.addTo(map);
  		// cafes.addTo(map);

  	});

  // // Get the countries geojson data
  // $http.get("data/bicycle-parking-cafe.geojson").success(function(data, status) {
  //  addGeoJsonLayerWithClustering(data);
  // });

  // function addGeoJsonLayerWithClustering(data) {
  //     var markers = L.markerClusterGroup();
  //     var geoJsonLayer = L.geoJson(data, {
  //         onEachFeature: function (feature, layer) {
  //             layer.bindPopup(feature.properties.name);
  //         }
  //     });
  //     markers.addLayer(geoJsonLayer);
  //     leafletData.getMap().then(function(map) {
  //       map.addLayer(markers);
  //       map.fitBounds(markers.getBounds());
  //     });
  // }

  }]);

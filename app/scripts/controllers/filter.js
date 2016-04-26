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

  // Get the countries geojson data
  $http.get("data/bicycle-parking-cafe.geojson")
  	.success(function(data, status) {
  		// function to add markers to layer and layer
  		// to map
   	addGeoJsonLayerWithClustering(data);
  });

  function addGeoJsonLayerWithClustering(data) {

      var markers = L.markerClusterGroup();
      var geoJsonLayer = L.geoJson(data, {
          onEachFeature: function (feature, layer) {
                // might be amenity, title, name or combo of fields
              layer.bindPopup(feature.properties.title);
          }
      });

      markers.addLayer(geoJsonLayer);

      leafletData.getMap().then(function(map) {
        map.addLayer(markers);
        map.fitBounds(markers.getBounds());
      });
 }
			
}]);
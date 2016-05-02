'use strict';

/**
 * @ngdoc function
 * @name meanMapApp.controller:AcademicCtrl
 * @description
 * # AcademicCtrl
 * Controller of the meanMapApp
 */
angular.module('meanMapApp')
.controller('AcademicCtrl',['$scope', '$http', 'leafletData', function($scope, $http, leafletData){
  
  angular.extend($scope, {
        center: {
          lat: 36.9914, 
          lng: -122.0609,
          zoom: 14
        },
        defaults: {
          scrollWheelZoom: false,
          maxZoom: 22
        },
        legend: {
            position: 'topright',
            colors: [ '#ff0000', '#28c9ff', '#0000ff', '#ecf386' ],
            labels: [ 'National Cycle Route', 'Regional Cycle Route', 'Local Cycle Network', 'Cycleway' ]
        }
      });

$scope.map = null;

leafletData.getMap().then(function(map) {
  $scope.map = map;

});

  // Get the countries geojson data
  $http.get("data/all-gender-final-geo.json").success(function(data, status) {
   addGeoJsonLayerWithClustering(data);
   
  });

  function addGeoJsonLayerWithClustering(data) {
      var markers = L.markerClusterGroup();
      var geoJsonLayer = L.geoJson(data, {
          onEachFeature: function (feature, layer) {
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

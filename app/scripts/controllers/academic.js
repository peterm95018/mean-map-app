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
        map.fitBounds(markers.getBounds([50, 50]));

legend.addTo(map);
      });
  }

var legend = L.control({position: 'topright'});
legend.onAdd = function(map) {
  var div = L.DomUtil.create('div', 'legend');
  div.innerHTML = '<strong>All-Gender Public Restrooms at UC Santa Cruz</strong>' +
  '<nav class="legend clearfix">' +
  'Click a marker for location name and additional information.' + '<br />' +
  '<small>Source: <a href="#link to source">All-Gender Restrooms List (pdf)</a></small>';
console.log(div)
  return div;
}


			
		}]);

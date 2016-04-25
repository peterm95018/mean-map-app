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
  
  var vm = this;
  
   vm.layers = {
      baselayers: {
          googleHybrid: {
              name: 'Google Hybrid',
              layerType: 'HYBRID',
              type: 'google'
          },
          googleRoadmap: {
              name: 'Google Streets',
              layerType: 'ROADMAP',
              type: 'google'
          }
      }
  };
  
  vm.center = {
  	lat: 36.9914, 
  	lng: -122.0609,
  	zoom: 14
  }

  vm.defaults = {
      scrollWheelZoom: true,
      maxZoom: 22
  }


  // Get the countries geojson data
  $http.get("data/all-gender-final-geo.json").success(function(data, status) {
   addGeoJsonLayerWithClustering(data)
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






  // .controller('AcademicCtrl', [ '$scope', '$http', function ($scope, $http) {


  //           angular.extend($scope, {
  //               center: {
  //                   lat: 36.9914, 
  //           		lng: -122.0609,
  //                   zoom: 14
  //               },
  //               defaults: {
  //               	scrollWheelZoom: false
  //               }
  //           });

  //           $http.get("data/all-gender-final-geo.json").success(function(data) {
  //                addGeoJsonLayerWithClustering(data);
  //           });
  			
  // 			function addGeoJsonLayerWithClustering(data) {
  //    		 var markers = L.markerClusterGroup();
  //    		 var geoJsonLayer = L.geoJson(data, {
  //         	onEachFeature: function (feature, layer) {
  //             layer.bindPopup(feature.properties.popupContent);
  //         }
  //     });
  //     markers.addLayer(geoJsonLayer);
  //     leafletData.getMap().then(function(map) {
  //       map.addLayer(markers);
  //       map.fitBounds(markers.getBounds());
  //     });


  // }]);

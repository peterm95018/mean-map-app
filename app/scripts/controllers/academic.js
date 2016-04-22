'use strict';

/**
 * @ngdoc function
 * @name meanMapApp.controller:AcademicCtrl
 * @description
 * # AcademicCtrl
 * Controller of the meanMapApp
 */
angular.module('meanMapApp')
  .controller('AcademicCtrl', [ '$scope', '$http', function ($scope, $http) {

  var addressPointsToMarkers = function(points) {
              return points.map(function(ap) {
                return {
                  layer: 'realworld',
                  lat: ap[0],
                  lng: ap[1]
                };
              });
            };

            angular.extend($scope, {
                center: {
                    lat: 36.9914, 
            		lng: -122.0609,
                    zoom: 14
                },
                events: {
                    map: {
                        enable: ['moveend', 'popupopen'],
                        logic: 'emit'
                    },
                    marker: {
                        enable: [],
                        logic: 'emit'
                    }
                },
                layers: {
                    baselayers: {
                        osm: {
                            name: 'OpenStreetMap',
                            type: 'xyz',
                            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        }
                    },
                    overlays: {
                        realworld: {
                            name: "Real world data",
                            type: "markercluster",
                            visible: true
                        }
                    }
                }
            });

            $http.get("data/all-gender-final-geo.json").success(function(data) {
                $scope.markers = addressPointsToMarkers(data);
            });
  
  }]);



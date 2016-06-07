angular.module('app')
    .controller('HomepageCtrl', function($scope, ajaxFactory) {

        $scope.headerSize = null;
        $scope.subTitleSize = null;
        $scope.titleBGColor = '#555';

        $scope.colorOptions = ['#002635', '#013440', '#AB1A25', '#D97925'];

        ajaxFactory.getAppTitle().then(function(results){
            $scope.mainTitle = results;
        });

        $scope.changeColor = function(color){
          $scope.titleBGColor = color;
        };

    })
    .controller('MapCtrl', function($scope) {
        L.mapbox.accessToken = 'pk.eyJ1IjoibmJ0c29sdXRpb25zIiwiYSI6ImNpb3ltYTlhcjAwZGN2Ym01Y2h4NHRicjgifQ.Ns5skYgm4-r17OilBTl2Sw';
        // Replace 'mapbox.streets' with your map id.
        var mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
            attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        var map = L.map('map')
            .addLayer(mapboxTiles)
            .setView([44.7791815,-68.7824097], 8);

        $scope.maker = null;  
        $scope.layers = L.layerGroup();    
        // When click a splice closure, highlight the point.
        var pointClicked = function(e) {
            console.log(e.latlng);
            console.log(e);
            $scope.marker = L.circleMarker(e.latlng, {
                    radius: 8,
                    fillColor: "#ff0000",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 1
                });
            $scope.layers.addLayer($scope.marker);
            $scope.layers.addTo(map);
            var markerLayers = $scope.layers.getLayers();
            console.log("information: " + markerLayers.length);
            if(markerLayers.length > 2) {
                $scope.layers.removeLayer(markerLayers[0]);
            }
        }      

        //Load data by Vetro API   
        $.getJSON( "https://staging.vetro.io/api/network/1/geometries/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoibWZjIiwiaWQiOjM1LCJpYXQiOjE0NjQ4ODkwMDh9.PiCyKkcY1QG3ZOqMoA22zViEr5I9fn_FwtimWtPQIa0", function( data ) {
            console.log(data["14"]);
            L.geoJson(data["14"]).addTo(map);   
            L.geoJson(data["19"], {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 4,
                    fillColor: "#C21998",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            }
            /*onEachFeature: function (feature, mylayer) {
                mylayer.bindPopup("this is a popup");
            }*/
        }).addTo(map).on('click', pointClicked);
        });
    });

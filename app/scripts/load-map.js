// Initialize a popup object
var popup = L.popup();

// turn the URL into a Uri object
var uri = new Uri(document.URL);

/* === Set up layers === */

// Base map
var basemap = L.tileLayer('http://{s}.tiles.mapbox.com/v3/cuboulder.cu-basemap/{z}/{x}/{y}.png',{
    maxZoom: 21,
    attribution: "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors"
});

var labels = L.tileLayer('http://{s}.tiles.mapbox.com/v3/cuboulder.cu-labels/{z}/{x}/{y}.png',{
    maxZoom: 21,
    zIndex: 5, // Show labels on top of other layers
    attribution: "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors"
});

      
      
// Buildings
var buildings = L.tileLayer('http://{s}.tiles.mapbox.com/v3/cuboulder.cu-buildings/{z}/{x}/{y}.png',{
    maxZoom: 21,
    attribution: "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors"
});
      
// Building popups
var buildingInteractions = new L.UtfGrid(
'http://{s}.tiles.mapbox.com/v3/cuboulder.cu-buildings/{z}/{x}/{y}.grid.json?callback={cb}',{
});
      
      
// Set up the onclick functionality

var letters = [];

buildingInteractions.on('click', function(e){
    //click events are fired with e.data==null if an area with no hit is clicked
    if (e.data) {
      // Set up the popup, and display it
      var content = popupContent(e.data, {});
      if (content != '') {
      //console.log(e);
        newLat = e.latlng.lat + .001;
        popup.setLatLng(e.latlng).setContent(content).openOn(map);
        this._map.panTo([newLat, e.latlng.lng]).setZoom(17);
        
                
      }
    } else {
    }
});

           
// Buildings + building interactions layer group
var buildingLayerGroup = L.layerGroup([
    buildings,
    buildingInteractions
]);
      
      
      
// Parking
var parking = L.tileLayer('http://{s}.tiles.mapbox.com/v3/cuboulder.cu-parking/{z}/{x}/{y}.png',{
    maxZoom: 21,
    attribution: "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors"
});
      
// Parking popups
var parkingInteractions = new L.UtfGrid(
    'http://{s}.tiles.mapbox.com/v3/cuboulder.cu-parking/{z}/{x}/{y}.grid.json?callback={cb}'
);
      
// Parking onclick functionality
/*
parkingInteractions.on('click', function(e){
    //click events are fired with e.data==null if an area with no hit is clicked
    if (e.data) {
      popup.setLatLng(e.latlng).setContent(popupContent(e.data,{})).openOn(map);
    } else {
    }
});
*/
            
// Parking + parking interactions layer group
var parkingLayerGroup = L.layerGroup([
    parking//,
    //parkingInteractions
]);


// Dining Halls
var dining = L.tileLayer('http://{s}.tiles.mapbox.com/v3/cuboulder.cu-dining/{z}/{x}/{y}.png',{
    maxZoom: 21,
    attribution: "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors"
});
      
// Dining popups
var diningInteractions = new L.UtfGrid(
    'http://{s}.tiles.mapbox.com/v3/cuboulder.cu-dining/{z}/{x}/{y}.grid.json?callback={cb}'
);
      
// Dining onclick functionality
diningInteractions.on('click', function(e){
    //click events are fired with e.data==null if an area with no hit is clicked
    if (e.data) {
      // Set up the popup, and display it
      popup.setLatLng(e.latlng).setContent(popupContent(e.data,{})).openOn(map);
    } else {
    }
});
            
// Dining + dining interactions layer group
var diningLayerGroup = L.layerGroup([
    dining,
    diningInteractions
]);
      
// Buses
var buses = L.tileLayer('http://{s}.tiles.mapbox.com/v3/cuboulder.cu-busses/{z}/{x}/{y}.png',{
    maxZoom: 21,
    attribution: "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors"
});
      
// Footpaths
var footpaths = L.tileLayer('http://{s}.tiles.mapbox.com/v3/cuboulder.cu-footpaths/{z}/{x}/{y}.png',{
    maxZoom: 21,
    attribution: "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors"
});
      
// Bike Parking
var bike_parking = L.tileLayer('http://{s}.tiles.mapbox.com/v3/cuboulder.cu-bike-parking/{z}/{x}/{y}.png',{
    maxZoom: 21,
    attribution: "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors"
});
      
// Emergency Phones
var e_phones = L.tileLayer('http://{s}.tiles.mapbox.com/v3/cuboulder.cu-emergency-telephones/{z}/{x}/{y}.png',{
    maxZoom: 21,
    attribution: "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors"
});
      
// Layer groups for layer controls
var baseMaps = {
    "Base Map": basemap
};

var overlayMaps = {
    "Buildings": buildingLayerGroup,
    "Footpaths": footpaths,
    "Parking": parkingLayerGroup,
    "Food": diningLayerGroup,
    "Buses": buses,
    "Bike Parking": bike_parking,
    "Emergency Telephones": e_phones
};
      
      
      
// Set up some stuff for initializing the map
var southWest = new L.LatLng(39.96,-105.30);
var northEast = new L.LatLng(40.05,-105.19);
var mapLimits = new L.LatLngBounds(southWest, northEast);
var mapCenter, mapDefaultZoom;
      
if(window.innerWidth > 800){
    // Desktop
    mapCenter = new L.LatLng(40.0090,-105.2686);
    mapDefaultZoom = 16;
}
else{
    // Mobile
    mapCenter = new L.LatLng(40.0090,-105.2686);
    mapDefaultZoom = 16;
}
      
      
//Initialize Map 
var map = L.map('map', {
    center: mapCenter,
    zoom: mapDefaultZoom,
    minZoom: 14,
    maxZoom: 21,
    zoomControl: false,
    attribution: 'Map data &copy; 2013 OpenStreetMap contributors',
    maxBounds: mapLimits,
    // Layers to enable by default
    layers: [basemap, labels]
});
      
      
      
// Add search via Nominatim
var osmGeocoder = new L.Control.OSMGeocoder({
    bounds: mapLimits,
    collapsed: false,
    position: 'topright',
    text: "",
    email: "homepage@colorado.edu", // This lets Nominatim know who to contact if something goes wrong
    callback: function(results) {
      if(results.length == 0){
        //alert("No results found");
      }
      else if(results.length > 1){
        //alert(results.length + " results found");
        for(i=0; i<results.length; i++) {
          //console.log(results);
          var bbox = results[i].boundingbox,
          first = new L.LatLng(bbox[0], bbox[2]),
          second = new L.LatLng(bbox[1], bbox[3]),
          bounds = new L.LatLngBounds([first, second]);
          var marker = L.marker([results[i].lat, results[i].lon]).addTo(map);
          
        }
      }
      else{
        var bbox = results[0].boundingbox,
        first = new L.LatLng(bbox[0], bbox[2]),
        second = new L.LatLng(bbox[1], bbox[3]),
        bounds = new L.LatLngBounds([first, second]);
        newLat = results[0].lat + .001;
        //this._map.fitBounds(bounds);
        this._map.panTo([results[0].lat, results[0].lon]).setZoom(17);
        //var marker = L.marker([results[0].lat, results[0].lon]).addTo(map);
        map.fireEvent('click',{latlng:[results[0].lat,results[0].lon]});
        
        
               
      }
    }
});
map.addControl(osmGeocoder);
            
            
// Add scale control
L.control.scale().addTo(map);
      
      
// Add fullscreen control
/*
NOTE: fullscreen does not work properly at the moment, so I've
commented it out. There are four issues with it that I know of:
  1. The fullscreen control disappears on some browsers/computers, but
      not others.
  2. On screens where the button does show up, the fullscreen view is
      dominated by a huge black bar.
  3. The sidebar is also missing from the fullscreen view. This is due to
      the fact that the fullscreen control is fullscreening the "map" div,
      and the sidebar is outside of that.
  4. Fullscreen currenly breaks the map on iPad.
*/
/*
if(window.innerWidth > 800){
    // Desktop
  var fullScreen = new L.Control.FullScreen(); 
  map.addControl(fullScreen);
}
*/
      
      
// Add static URLs
var hash = new L.Hash(map);


// Add geolocation
map.locate({setView: false});
function onLocationFound(e) {
  
  if( mapLimits.contains(e.latlng) && (e.accuracy < 50) ){
    if (uri.getQueryParamValue("bldg") == ''){
      map.setView(e.latlng,16);
    }
    var radius = e.accuracy / 2;
    L.circleMarker(e.latlng, 10).addTo(map);
  }
}
map.on('locationfound', onLocationFound);

// If geolocation failed, display error.
function onLocationError(e) {
    //alert(e.message);
}
map.on('locationerror', onLocationError);


// Set up sidebar
$('#sidebar-button, #menu-toggle').click(function(){
  if($('#sidebar-menu').css('display') == 'block'){
    $('#sidebar-menu, #destinations-list').fadeOut();
    //$('#sidebar-button').css('background-image', 'url(lib/css/img/right-arrow.png)');
  }
  else{
    $('#sidebar-menu').fadeIn();
    //$('#sidebar-button').css('background-image', 'url(lib/css/img/left-arrow.png)');
  }
  
  
  
  
  return false;
});
$('a#close-menu').click(function(){
  $('#sidebar-menu, #destinations-list').fadeOut();
  return false;
});

// Create controls for basemap layers
$.each(baseMaps,function(i,v){
  var id = 'bm-control-' + i.replace(' ','_');
  $('#basemap-layer-controls').append('<input type="radio" class="bm-layer-control" id="' + id + '"><span>' + i + '</span><br />');
  $('#' + id).change(function(){
    if (this.checked){
      // Enable the layer
      map.addLayer(v);
    }
    else{
      // Disable the layer
      map.removeLayer(v);
    }
  });
  // If the layer was added initially, check the control
  if(map.hasLayer(v)){
    $('#'+id).prop("checked",true);
  }
});

// Create controls for overlay layers
$.each(overlayMaps,function(i,v){
  var layerID = i.replace(' ','_').toLowerCase();
  var id = 'ov-control-' + layerID;
  $('#overlay-layer-controls').append('<input type="checkbox" class="ov-layer-control" id="' + id +  '"><span>' + i + '</span><br />');
  $('#'+id).change(function(){
    if (this.checked){
      // Enable the layer
      map.addLayer(v);
    }
    else{
      // Disable the layer
      map.removeLayer(v);
    }
    // Add the checked layers to the URL params
    var ids = []; 
    $('#overlay-layer-controls input:checked').each(function(){ 
      ids.push(this.id.split("-")[2]);
    });
    uri.deleteQueryParam('layers');
    $.each(ids, function(i,id){
      uri.addQueryParam('layers', id);
    });
    window.history.pushState("", "", uri.toString());
    
    $('.'+layerID+'-toggle').toggle();
  });
  // If the layer was added initially, check the control
  if(map.hasLayer(v)){
    $('#'+id).prop("checked",true);
    $('.'+layerID+'-toggle').show();
  }else{
    $('.'+layerID+'-toggle').hide();
  }

});


// Enable static urls to buildings.
var bldg_id = uri.getQueryParamValue("bldg");
var q = uri.getQueryParamValue("q");
var search = uri.getQueryParamValue("search");
var layers = uri.getQueryParamValues("layers");

if(q != undefined) {
  $('.leaflet-control-geocoder-form input').val(q);
  $('.leaflet-control-geocoder-form button').click();
}
else if(search != undefined) {
  $('.leaflet-control-geocoder-form input').val(q);
  $('.leaflet-control-geocoder-form button').click();
}
else if (bldg_id != undefined){
  $('.leaflet-control-geocoder-form input').val(bldg_id);
  $('.leaflet-control-geocoder-form button').click();
} 

if (layers.length == 0) {
  layers = ["buildings","footpaths"];
}
$.each(layers,function(i, layerid){
  //console.log(layerid);
  $('#ov-control-'+layerid).prop("checked", true).triggerHandler('change');
});


$('.leaflet-control-geocoder-form input').attr('placeholder', 'Search Campus Map');


var embed = new Uri(document.URL).getQueryParamValue("embed");
if (embed) {
  $("body").addClass("embed");
}
$(document).ready(function(){
  $('#ov-control-buildings').attr('disabled', 'disabled');

  var state;

  $('a.section-toggle').on('click', function() {
    var showthis = $(this).attr("href");
    $(this).toggleClass('toggle-show');
    $(this).toggleClass('toggle-hide');
    state = !state; 
    if (state) {
      $(showthis).slideDown();
      
      return false;
    } else {
      $(showthis).slideUp();
      
      return false;
    }
  });
  $("a#embed-link").click(function() {
    var mapURL = document.URL + '?embed=true';
    var embedCode = '<iframe src="' + mapURL + '" width="600" height="400" scrolling="no" frameborder="0" style="border:0;"></iframe>';
    $("#embed-code").val(embedCode);
    $("#embed").fadeIn();
    return false;
  });
  $("a#close-embed").click(function() {
    $("#embed").fadeOut();
    return false;
  });
  $("a#select-location").click(function(){
    $('#destinations-list').fadeIn();
    return false;
  });
  $('html').click(function() {
    $('#destinations-list, #embed').fadeOut();
    if(window.innerWidth < 800){
      $('#sidebar-menu').fadeOut();
    }
  });
  
  $('#destinations-list, #embed, #sidebar-menu').click(function(event){
      event.stopPropagation();
  });
});

$(function(){
  // bind change event to select
  $('#destinations-list a').on('click', function () {
      var url = $(this).attr('href'); // get selected value
      if (url) { // require a URL
          //window.location = url; // redirect
          if(window.innerWidth < 800){
            $('#sidebar-menu').fadeOut();
          }
          //$("a#select-location").click();
          //alert(url);
          $('input#search-form-input').val(url);
          $('.leaflet-control-geocoder-form button').click();
      }
      return false;
  });
});

function easterEgg() {
  if ( letters.toString().indexOf("R,A,L,P,H,I,E" ) >= 0 ){
    alert('Go Buffs!!!');
    letters = [];
  }

}
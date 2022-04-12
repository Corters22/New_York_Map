var myMap = L.map('map', {
    center: [40.730610, -73.935242],
    zoom: 11    
});

var streetLayer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);


 var sat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
     maxZoom: 20,
     subdomains:['mt0','mt1','mt2','mt3']
 });

 var zipLayer = L.geoJSON(zip_code, {
    onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.ZIPCODE)
    }   
 });
 
 var boroughLayer = L.geoJSON(borough, {
     color:"black",
     onEachFeature: function(feature, layer) {
         layer.bindPopup(feature.properties.borough)
         if (feature.properties.borough == 'Queens'){
             layer.setStyle({fillColor:'purple', fillOpacity:.8})
         }
         else if (feature.properties.borough == 'Staten Island'){
             layer.setStyle({fillColor: 'green', fillOpacity:.8})
         }
         else if (feature.properties.borough == 'Manhattan'){
            layer.setStyle({fillColor: 'pink', fillOpacity:.8})
        }
        else if (feature.properties.borough == 'Brooklyn'){
            layer.setStyle({fillColor: 'orange', fillOpacity:.8})
        }
         else {
             layer.setStyle({fillColor:'blue', fillOpacity:.8})
         }
         
     }
 });

       
    var overlayMaps = {
        "Zip Boundary": zipLayer, 
        'Borough Boundary': boroughLayer,
    };

    
     var baseMaps = {
         Street: streetLayer, 
         Satellite: sat,
         

     };
     L.control.layers(baseMaps, overlayMaps, {
         collapsed: false
     }).addTo(myMap);
     L.Control.geocoder().addTo(myMap);
    


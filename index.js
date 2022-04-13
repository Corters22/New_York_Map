var myMap = L.map('map', {
    center: [40.730610, -73.935242],
    zoom: 11    
});

var streetLayer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

var darkLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    id: 'mapbox/dark-v10',
    accessToken: 'pk.eyJ1IjoiY29ydGVyczIyIiwiYSI6ImNrbnZ2ZTUxNjBtc24zMG8zY3M1Mm81MDAifQ.jXDrO8PpnSPWZ5V18bzHgA'
});


 var sat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
     maxZoom: 20,
     subdomains:['mt0','mt1','mt2','mt3']
 });

url1 = 'https://data.beta.nyc/dataset/68c0332f-c3bb-4a78-a0c1-32af515892d6/resource/7c164faa-4458-4ff2-9ef0-09db00b509ef/download/42c737fd496f4d6683bba25fb0e86e1dnycboroughboundaries.geojson'
url = "https://data.beta.nyc/dataset/nyc-zip-code-tabulation-areas/resource/6df127b1-6d04-4bb7-b983-07402a2c3f90/view/b34c6552-9fdb-4f95-8810-0588ad1a4cc8" 
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

 var subLayer = L.geoJSON(subway, {
    onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.name)
        if (feature.properties.name == 'G'){
            layer.setStyle({color: '#ff6319', fillColor:'#ff6319', fillOpacity:.8})
        }
        else if (feature.properties.name == 'Q'|| feature.properties.name == 'N' || feature.properties.name == 'R' || feature.properties.name == 'W'){
            layer.setStyle({color: 'yellow', fillColor: 'yellow', fillOpacity:.8})
        }
        else if (feature.properties.name == 'J' || feature.properties.name == 'Z'){
           layer.setStyle({color:'brown',fillColor: 'brown', fillOpacity:.8})
       }
       else if (feature.properties.name == 'A' || feature.properties.name == 'C' || feature.properties.name == 'E'){
           layer.setStyle({color:'#0039a6', fillColor: '#0039a6', fillOpacity:.8})
       }
       else if (feature.properties.name == 'S'){
        layer.setStyle({color:'#808183',fillColor: '#808183', fillOpacity:.8})
       }
       else if (feature.properties.name == 'L'){
        layer.setStyle({color:'#a7a9ac',fillColor: '#a7a9ac', fillOpacity:.8})
    }
        else if (feature.properties.name == 'B'|| feature.properties.name == 'D' || feature.properties.name == 'F' || feature.properties.name == 'M'){
            layer.setStyle({color:'orange',fillColor: 'orange', fillOpacity:.8})
    }
        else if (feature.properties.name == '1' || feature.properties.name == '2' || feature.properties.name == '3'){
        layer.setStyle({color:'red',fillColor: 'red', fillOpacity:.8}) 
        }
        else if (feature.properties.name == '4' || feature.properties.name == '5' || feature.properties.name == '6'){
            layer.setStyle({color:'#00933c',fillColor: '#00933c', fillOpacity:.8})
        }
        else if (feature.properties.name == '7'){
            layer.setStyle({color: 'purple', fillColor: 'purple', fillOpacity:.8})
           }
        else {
            layer.setStyle({olor:'#00add0',fillColor:'00add0', fillOpacity:.8})
        }
        
    }
});

//  d3.json(url).then(function(data) {
//      var subLayer = L.geoJSON(data, {
//          color: 'black'
//      })
//  })

//     d3.json(url1).then(function(data) {
//         var boroughLayer2 = L.geoJSON(data, {
//             color: "red",
//             onEachFeature: function(feature, layer) {
//                 layer.bindPopup(feature.properties.borough)
//                 if (feature.properties.borough == 'Queens'){
//                     layer.setStyle({fillColor:'purple', fillOpacity:.8})
//                 }
//                 else if (feature.properties.borough == 'Staten Island'){
//                     layer.setStyle({fillColor: 'green', fillOpacity:.8})
//                 }
//                 else if (feature.properties.borough == 'Manhattan'){
    //                layer.setStyle({fillColor: 'pink', fillOpacity:.8})
    //            }
    //            else if (feature.properties.borough == 'Brooklyn'){
    //                layer.setStyle({fillColor: 'orange', fillOpacity:.8})
    //            }
    //             else {
    //                 layer.setStyle({fillColor:'blue', fillOpacity:.8})
    //             }
                
    //         }
    //     })
        
    // })


       
    var overlayMaps = {
        "Zip Boundary": zipLayer, 
        // "Zip Boundary2": zipLayer2, 
        'Borough Boundary': boroughLayer,
        'Subway Lines': subLayer,
    };

    
     var baseMaps = {
         Street: streetLayer, 
         Satellite: sat,
         Dark: darkLayer,
         

     };
     L.control.layers(baseMaps, overlayMaps, {
         collapsed: false
     }).addTo(myMap);
     L.Control.geocoder().addTo(myMap);
    


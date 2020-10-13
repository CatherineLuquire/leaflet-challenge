// Define satellite, streetmap and darkmap layers
var satmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
});

var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
});

// Define a baseMaps object to hold our base layers
var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Satellite Map": satmap,
};

// define layers
var earthquakes = new L.LayerGroup();
var faultLine = new L.LayerGroup();

// Create overlay object to hold our overlay layer
var overlayMaps = {
    Earthquakes: earthquakes,
    Faultlines: faultLine,
};

// Create our map, giving it the satellite and earthquakes layers to display on load
var myMap = L.map("mapid", {
    center: [
        37.09, -95.71
    ],
    zoom: 5,
    layers: [satmap, earthquakes]
});

// Create a layer control
// Pass in our baseMaps and overlayMaps
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);

// Define legend control
var legend = L.control({ position: 'bottomright' });

// Create function to create legend
legend.onAdd = function(map){
    // create new info legend div and assign depth values to grade list
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [-10, 10, 30, 50, 70, 90];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
        '<i style="background:' + circleColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};
// Add legend to map
legend.addTo(myMap);

// Define faultine query link
var faultlineQuery = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

// Create the faultlines and add them to the faultline layer
d3.json(faultlineQuery, function (data) {
    L.geoJSON(data, {
        style: function () {
            return { color: "orange", fillOpacity: 0 }
        }
    }).addTo(faultLine)
})

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    console.log(data);
    createFeatures(data.features);
});
    // Create function to style circleMarkers
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: .75,
            fillColor: circleColor(feature.geometry.coordinates[2]),
            color: "black",
            radius: radiusSize(feature.properties.mag),
            stroke: true,
            weight: 0.5,
        }
    };
    // Create function to assign the radius value to magnitude
    function radiusSize(magnitude) {
        return magnitude * 5;
    };
    // Create function to assign the circle color to depth
    function circleColor(d) {
        return d > 90 ? '#ff3333' :
               d > 70 ? '#ff6633' :
               d > 50 ? '#ff9933' :
               d > 30 ? '#ffcc33' :
               d > 10 ? '#ffff33' :
                      '#ccff33';
    };
    // Create createFeatures function
    function createFeatures(earthquakeData) {
        // function to give each feature a popup with place and time of earthquake
        function onEachFeature(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place +
                "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
        }

        // Create a GeoJSON layer containing the features array on the earthquakeData object
        // Use pointToLayer to return circleMarkers
        // Call styleInfo function to get the proper radius and color of each circle
        // Call the onEachFeature function to get popup data for each circle
        L.geoJson(earthquakeData, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng);
            },
            style: styleInfo,
            onEachFeature: onEachFeature
        }).addTo(earthquakes);
        // add data to earthquake layer
        earthquakes.addTo(myMap);
    };

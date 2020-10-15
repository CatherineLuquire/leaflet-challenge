# Web Mapping - Visualizing Data with Leaflet

Created interactive map to visualize global earthquake information and with the option to compare with tectonic plate boundaries.

##

![Earthquakes Demo](images/sat_earthquakes.png)

## Table of contents

* [Technologies](#technologies)
* [Installation](#installation)
* [Development Process](#development-process)
* [Data Sources](#data-sources)
* [Contact](#contact)

## Technologies

* Javascript:
  * Leaflet - version 1.6.0
  * d3 - version 4.2.3 & 4.5.0
* HTML
  * d3 cdn version 4.5.0 
* CSS
  * Leaflet - version 1.6.0

## Installation and Usage
Installation: 
1. Link Leaflet CSS stylesheet in index header for map visualization and functionality.
2. Link d3 CDN script into index header for high-quality content with fast load speeds.
3. Link style.css HTML and javascript styling.
4. Link Leaflet js script and d3 script into index body for javascript and leaflet functionality.
5. Reference static/js/logic.js in index body to connect to javascript file. 
6. Reference static/js/config.js in index of body to call and safely store Mapbox API key.

Usage:
1. Overlay Features: select map option to change display map. Select Earthquakes and/or Faultlines features to visualize earthquake and tectonic plate data. 
2. Earthquake features: 
  * Legend: color legend details the depth of the earthquake epicenter. 
  * Radius displays magnitude.
  * Click on circle markers to see information on the time and location of the earthquake event.
2. Zoom Features: select plus or minus buttons in top left of map to zoom in and out.
3. Click and drag to move the map


## Development Process

* Used d3 to bind the data to the HTML document, then built an interactive scatterplot to visualize demographic data.  

## Data Sources
* [Link to 2014 Census Data](D3_data_journalism/assets/data/data.csv)
* Data sourced from: US Census Data. Retrieved from: [https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml](https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml)

## Contact
Created by [Katy Luquire](https://github.com/CatherineLuquire)

const L = require('leaflet');

// Default map layer
const defaultLayer = L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=rGP5busAaMXCFOIDznfW', { attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',})

class MapView {
    constructor(mapContainer) {
        // The Image layer display all of the images
        this.imageLayer = L.layerGroup();

        // Set up the map, and fit it to the entire world to begin
        this.map = L.map(mapContainer, {
            zoomControl: true,
            layers: [
                defaultLayer 
            ]
        }).fitWorld();
    }
};

module.exports = {
    MapView: MapView
};
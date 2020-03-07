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

        // map event handlers

        // gets lat lng on mouse move
        this.map.on("mousemove", function(event) {
            var lat = event.latlng.lat;
            var lng = event.latlng.lng;
            console.log("lat :" + lat + " lng : " + lng);

        });
        

        //gets the zoom scale
        var scale = this.map.getZoom()
        console.log(scale);

        this.map.on("zoomend", function(event){
            // 
            //console.log(event.getZoom());
            //console.log(this.map.getZoom());
            console.log(this.getZoom());
            

        });

    }
};

module.exports = {
    MapView: MapView
};
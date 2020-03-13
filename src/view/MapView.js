const L = require('leaflet');
const LATLONG = require('./latlong.js')

// Default map layer
const defaultLayer = L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=rGP5busAaMXCFOIDznfW', { attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>', })

class MapView {
    constructor(mapContainer) {
        // The Image layer display all of the images
        this.imageLayer = L.layerGroup();

        //Set up the map, initilize view starting at Portland
        this.map = L.map(mapContainer, {
            zoomControl: true,
            layers: [
                defaultLayer
            ]
        }).setView([45.512794, -122.679565], 12);

        // set up the info control box
        var myinfo = { lat: 0, lng: 0, zoom: this.map.getZoom() };
        var info = L.control({ position: 'bottomleft' });
        info = LATLONG.PanelCreate(info);
        info = LATLONG.PanelUpdate(info);
        info.addTo(this.map);

        //latlong mouse events
        LATLONG.MouseEvents(this.map, info ,myinfo);
    }
};

module.exports = {
    MapView: MapView
};
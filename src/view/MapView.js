const L = require('leaflet');

// Default map layer
const defaultLayer = L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=rGP5busAaMXCFOIDznfW', { attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>', })

class MapView {
    constructor(mapContainer) {
        // The Image layer display all of the images
        this.imageLayer = L.layerGroup();

        // Set up the map, and fit it to the entire world to begin
        /*this.map = L.map(mapContainer, {
            zoomControl: true,
            layers: [
                defaultLayer 
            ]
        }).fitWorld();*/
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
        info.onAdd = function(map) {
                this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
                this.update();
                return this._div;

            }
            // updates the information displayed in the info control box
        info.update = function(myinfo) {
            this._div.innerHTML = (myinfo ? '<b> lat: ' + myinfo.lat + " long: " + myinfo.lng + ' zoom: ' + myinfo.zoom + '</b>' :
                'unavailable');
        }
        info.addTo(this.map);

        // map event handlers

        // gets lat lng on mouse move and updates the info control box
        this.map.on("mousemove", function(event) {
            var lat = event.latlng.lat.toFixed(2);
            var lng = (event.latlng.lng % 180).toFixed(2);
            myinfo.lat = lat;
            myinfo.lng = lng;
            info.update(myinfo);

        });
        // gets the zoom scale and updates the info control box
        this.map.on("zoomend", function(event) {
            var mapScale = this.getZoom();
            myinfo.zoom = mapScale;
            info.update(myinfo);
        });

    }
};

module.exports = {
    MapView: MapView
};
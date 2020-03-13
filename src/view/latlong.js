
const L = require('leaflet');

exports.MouseEvents = function(map, info, myinfo) {
    // gets lat lng on mouse move and updates the info control box
    map.on("mousemove", function(event) {
        var lat = event.latlng.lat.toFixed(2);
        var lng = (event.latlng.lng % 180).toFixed(2);
        myinfo.lat = lat;
        myinfo.lng = lng;
        info.update(myinfo);
    });
    // gets the zoom scale and updates the info control box
    map.on("zoomend", function(event) {
        var mapScale = this.getZoom();
        myinfo.zoom = mapScale;
        info.update(myinfo);
    });
}

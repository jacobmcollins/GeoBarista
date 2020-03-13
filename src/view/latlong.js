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

exports.PanelCreate = function(info) {
    info.onAdd = function(map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    }
    info.update = function(myinfo) {
    }
    return info;
}
exports.PanelUpdate = function(info) {
    info.update = function(myinfo) {
        this._div.innerHTML = (myinfo ? '<b> lat: ' + myinfo.lat + " long: " + myinfo.lng + ' zoom: ' + myinfo.zoom + '</b>' :
            'unavailable');
    }
    return info;
}

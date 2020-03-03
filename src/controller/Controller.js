const {MapView} = require("../view/MapView.js");

class Controller {
    constructor(mapContainer) {
        this.mapView = new MapView(mapContainer);
    }
}

module.exports = {
    Controller: Controller
};
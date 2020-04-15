import React from 'react';

import { EditControl} from 'react-leaflet-draw';
import { FeatureGroup } from 'react-leaflet';
import L from 'leaflet';



// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png',
});

  const onCreated = (e) => {
    let type = e.layerType;
    let layer = e.layer;

    console.log("Created: ", type , e);
    // Do whatever else you need to. (save to db; etc)
    let test = layer.toGeoJSON();
    console.log("GeoJSON: ", test);
  }


export default function DrawTools(props) {
     return (
        <FeatureGroup fillColor="black" >
        <EditControl
             position = 'bottomright'
             onCreated={onCreated}
             edit = {{
               edit : false,
               remove : true,
             }}
             draw =  {{
                 marker: false,
                 circle: false,
                 rectangle: true,
                 polygon: true,
                 polyline: false,
                 circlemarker: true,
                 edit: false,
             }}
        />
    </FeatureGroup>
    )
}
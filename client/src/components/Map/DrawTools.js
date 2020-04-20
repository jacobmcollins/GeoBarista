import React from 'react';
import { createRef }  from 'react';

import { EditControl} from 'react-leaflet-draw';
import { FeatureGroup } from 'react-leaflet';
import L from 'leaflet';

const drawToolsGroupRef = createRef();


// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png',
});



export default function DrawTools(props) {
  const {selectByGeoJSON} = props;
  const onDrawStart = (e) => {
    drawToolsGroupRef.current.leafletElement.clearLayers();
  }
  const onCreated = (e) => {
    let type = e.layerType;
    let layer = e.layer;

    console.log("Created: ", type , e);
    // Do whatever else you need to. (save to db; etc)
    let test = layer.toGeoJSON();
    console.log("GeoJSON: ", test);
    selectByGeoJSON(test);
  }
     return (
        <FeatureGroup 
          ref={drawToolsGroupRef}
          fillColor="black" 
        >
        <EditControl
             position = 'bottomright'
             onCreated={onCreated}
             onDrawStart={onDrawStart}
             edit = {{
               edit : false,
               remove : true,
             }}
             draw =  {{
                 marker: false,
                 circle: false,
                 rectangle: true,
                 polygon: false,
                 polyline: false,
                 circlemarker: false,
                 edit: false,
                 repeatMode: false
             }}
        />
    </FeatureGroup>
    )
}
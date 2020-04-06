import React from 'react';

import { EditControl} from 'react-leaflet-draw';
import { FeatureGroup } from 'react-leaflet';
import L, { bounds } from 'leaflet';


// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png',
});

 const onEdited = (e) => {

    let numEdited = 0;
    e.layers.eachLayer( (layer) => {
      numEdited += 1;
    });
    console.log(`_onEdited: edited ${numEdited} layers`, e);

  }
  const onCreated = (e) => {
    let type = e.layerType;
    let layer = e.layer;

    console.log("Created: ", type , e);
    // Do whatever else you need to. (save to db; etc)
    let test = layer.toGeoJSON();
    console.log("GeoJSON: ", test);
  }

  const onDeleted = (e) => {

    let numDeleted = 0;
    e.layers.eachLayer( (layer) => {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);

  }

  const onMounted = (drawControl) => {
    console.log('_onMounted', drawControl);
  }

  const onEditStart = (e) => {
    console.log('_onEditStart', e);
  }

  const onEditStop = (e) => {
    console.log('_onEditStop', e);
  }

  const onDeleteStart = (e) => {
    console.log('_onDeleteStart', e);
  }

  const onDeleteStop = (e) => {
    console.log('_onDeleteStop', e);
  }

export default function DrawTools(props) {
     return (
        <FeatureGroup fillColor="black" >
        <EditControl
             position = 'bottomright'
             onEdited={onEdited}
             onCreated={onCreated}
             onDeleted={onDeleted}
             onMounted={onMounted}
             onEditStart={onEditStart}
             onEditStop={onEditStop}
             onDeleteStart={onDeleteStart}
             onDeleteStop={onDeleteStop}
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
                 circlemarker: false,
                 edit: false,
             }}
        />
    </FeatureGroup>
    )
}
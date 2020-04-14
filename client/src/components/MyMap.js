import React, { createRef } from 'react';
import { Map, TileLayer, Polygon } from 'react-leaflet';
import DrawTools from './DrawTools';
import ZoomLatLngBox from './ZoomLatLngBox';

const mapRef = createRef();

export default function MyMap(props) {
    const {classes, imageMenuOpen} = props;
    const [zoom, setZoom] =  React.useState(13);
    const [center, setCenter] = React.useState({
        lat: 45.51,
        lng: -122.505
    })
    const [mouse, setMouse] = React.useState({
        lat: 51.505,
        lng: -0.09
    })
    const handleOnClick = (e) => {
        console.log("i clicked");
    }
    const handleOnMouseMove = (e) => {
        if(!mapRef.current) return;
        setMouse(e.latlng);
    }
    const handleZoom = (e) => {
        if(!mapRef.current) return;
        setZoom(mapRef.current.leafletElement.getZoom());
    }
    return (
        <React.Fragment>
            <main className={imageMenuOpen ? classes.mainShifted : classes.main}>
                <Map 
                    center={center} 
                    length={4}
                    onmousemove={handleOnMouseMove}
                    onzoomend={handleZoom}
                    onclick={handleOnClick}
                    ref={mapRef}
                    zoom={zoom}
                    style={{height: "100%", width: "100%", zindex: 0}}
                    zoomControl={false}
                >
                    <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <DrawTools/>
                </Map>
            </main>
            <ZoomLatLngBox classes={classes} zoom={zoom} latlng={mouse}/>
        </React.Fragment>
    )
};

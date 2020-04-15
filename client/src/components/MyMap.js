import React, { createRef }  from 'react';
import { Map, TileLayer, Polygon } from 'react-leaflet';
import DrawTools from './DrawTools';
import ZoomLatLngBox from './ZoomLatLngBox';
import { polygon, Renderer } from 'leaflet';

const mapRef = createRef();

export default function MyMap(props) {
    const {classes, imageMenuOpen, mapImages} = props;
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
    const onClickSelection = (e,image) => {
        var targ = e.target;
        if (image.selected == false) {
            image.selected = true;
            image.selectedColor = "#0000FF";
        }
        else {
            image.selected = false;
            image.selectedColor = "#FF0000";
        }
        /*
        if (targ.options.selected ) {
            targ.options.selected = false;
            targ.options.color = "#00FF00";
            targ.options.fillColor = "#00FF00";
        } 
        else {
            targ.options.selected = true;
            targ.options.color = "#0000FF";
            targ.options.fillColor = "#0000FF";
        }
        */
        console.log("my image data :" + image);
        console.log("target : " + targ);
        console.log("my index is : " + targ.options.key);
        console.log("selected : " + targ.options.selected);
        console.log("my colors : " + targ.options.color);
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
                    {
                        mapImages.map((image, index) => <Polygon onclick={e => onClickSelection(e, image)} selected={image.selected} key={index} positions={JSON.parse(image.points)} color={image.selectedColor } fillColor={image.selectedColor} />)
                    }
                    <DrawTools/>
                </Map>
            </main>
            <ZoomLatLngBox classes={classes} zoom={zoom} latlng={mouse}/>
        </React.Fragment>
    )
};

import React, { createRef }  from 'react';
import { Map, TileLayer, Polygon } from 'react-leaflet';
import DrawTools from './DrawTools';
import ZoomLatLngBox from './ZoomLatLngBox';
import { polygon, Renderer } from 'leaflet';

const mapRef = createRef();

export default function GeoBaristaMap(props) {
    const {classes, imageMenuOpen, images, selectImageById} = props;
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
    const onClickSelection = async (e,image) => {
        await selectImageById(image._id, !image.selected);
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
                        images.map((image, index) => {
                            if(image.visible) {
                                return (<Polygon 
                                    onclick={e => onClickSelection(e, image)} 
                                    selected={image.selected} 
                                    key={image._id} 
                                    positions={JSON.parse(image.points)} 
                                    color={image.selected ? "#00ff00" : "#ff0000"} 
                                    fillColor={image.selected ? "#00ff00" : "#ff0000"} 
                                    /> )
                            }
                        })                   
                    }
                    <DrawTools/>
                </Map>
            </main>
            <ZoomLatLngBox classes={classes} zoom={zoom} latlng={mouse}/>
        </React.Fragment>
    )
};

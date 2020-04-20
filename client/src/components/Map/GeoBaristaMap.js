import React, { createRef }  from 'react';
import { Map, TileLayer, Polygon, FeatureGroup } from 'react-leaflet';
import DrawTools from './DrawTools';
import ZoomLatLngBox from './ZoomLatLngBox';
import { polygon, Renderer } from 'leaflet';
import { booleanPointInPolygon } from '@turf/turf';
import { intersect } from '@turf/turf';
import { point } from '@turf/helpers';

const mapRef = createRef();
const featureGroupRef = createRef();

export default function GeoBaristaMap(props) {
    const {classes, imageMenuOpen, images, selectImageById, selectImagesById} = props;
    const [zoom, setZoom] =  React.useState(13);
    const [center, setCenter] = React.useState({
        lat: 45.51,
        lng: -122.505
    })
    const [mouse, setMouse] = React.useState({
        lat: 51.505,
        lng: -0.09
    })
    const [viewPort, setViewPort] = React.useState({
        center: center,
        zoom: zoom
    });
    const [selectionGeoJSONs, setSelectionGeoJSONs] = React.useState({
    });
    const selectByGeoJSON = (geojson) => {
        console.log(geojson)
        const group = featureGroupRef.current.leafletElement;
        let select = [];
        let unselect = [];
        group.eachLayer((layer) => {
            var poly = layer.toGeoJSON();
            if(intersect(geojson, poly, {ignoreBoundary: true})){
                select.push(layer.options.id)
            }
            else {
                unselect.push(layer.options.id)
            }
        })
        selectImagesById({
            select: select,
            unselect: unselect
        });
    }
    const handleOnClick = (e) => {
        const group = featureGroupRef.current.leafletElement;
        let select = [];
        let unselect = [];
        var pt = point([e.latlng.lng, e.latlng.lat]);
        group.eachLayer((layer) => {
            var poly = layer.toGeoJSON();
            if(booleanPointInPolygon(pt, poly, {ignoreBoundary: true})){
                select.push(layer.options.id)
            }
            else {
                unselect.push(layer.options.id)
            }
        })
        selectImagesById({
            select: select,
            unselect: unselect
        });
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
    const onViewPortChanged = (viewport) => {
    }
    return (
        <React.Fragment>
            <main className={imageMenuOpen ? classes.mainShifted : classes.main}>
                <Map 
                    length={4}
                    onmousemove={handleOnMouseMove}
                    onzoomend={handleZoom}
                    onclick={handleOnClick}
                    ref={mapRef}
                    style={{height: "100%", width: "100%", zindex: 0}}
                    zoomControl={false}
                    viewport={viewPort}
                    onViewportChanged={onViewPortChanged}
                >
                    <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FeatureGroup ref={featureGroupRef}>
                    {
                        images.map((image, index) => {
                            if(image.visible) {
                                return (<Polygon 
                                    // onclick={e => onClickSelection(e, image)} 
                                    id={image._id}
                                    selected={image.selected} 
                                    key={image._id} 
                                    positions={JSON.parse(image.points)} 
                                    color={image.selected ? "#00ff00" : "#ff0000"} 
                                    // fillColor={image.selected ? "#00ff00" : "#ff0000"} 
                                    /> )
                            }
                        })                   
                    }
                    </FeatureGroup>
                    <DrawTools selectByGeoJSON={selectByGeoJSON}/>
                </Map>
            </main>
            <ZoomLatLngBox classes={classes} zoom={zoom} latlng={mouse}/>
        </React.Fragment>
    )
};

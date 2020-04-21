import React, { createRef }  from 'react';
import { Map, TileLayer, GeoJSON, FeatureGroup } from 'react-leaflet';
import DrawTools from './DrawTools';
import ZoomLatLngBox from './ZoomLatLngBox';
import { booleanPointInPolygon } from '@turf/turf';
import { intersect } from '@turf/turf';
import { point, featureCollection, polygon } from '@turf/helpers';
import hash from 'object-hash';
import L from 'leaflet';
import 'leaflet-imageoverlay-rotated'

const mapRef = createRef();
const geoJsonRef = createRef();

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
        const group = geoJsonRef.current.leafletElement;
        let select = [];
        let unselect = [];
        group.eachLayer((layer) => {
            var poly = layer.feature;
            if(intersect(geojson, poly, {ignoreBoundary: true})){
                select.push(layer.feature.properties.id)
            }
            else {
                unselect.push(layer.feature.properties.id)
            }
        })
        selectImagesById({
            select: select,
            unselect: unselect
        });
    }
    const handleOnClick = (e) => {
        const group = geoJsonRef?.current?.leafletElement;
        let select = [];
        let unselect = [];
        var pt = point([e.latlng.lng, e.latlng.lat]);
        group.eachLayer((layer) => {
            console.log('layer', layer);
            let poly = layer.feature;
            if(booleanPointInPolygon(pt, poly, {ignoreBoundary: true})){
                console.log('select')
                select.push(layer.feature.properties.id)
            }
            else {
                unselect.push(layer.feature.properties.id)
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
    const onViewPortChanged = (viewport) => {
    }
    // input  -> an image
    // output -> polygon in GeoJSON
    const get_poly_from_image = (image) => {
        let points = JSON.parse(image.points);
        points.push(points[0])
        let polyPoints = [];
        polyPoints.push(points);
        let poly = polygon(polyPoints, {
            id: image._id,
            selected: image.selected
        });
        return poly;
    }
    // input  -> images from DB
    // output -> feature collection in GeoJSON
    const get_data = (images) => {
        let all = [];
        images.slice(0).reverse().forEach((image) => {
            if(image.visible) {
                let poly = get_poly_from_image(image);
                all.push(poly)
            }
        });
        let collection = featureCollection(all);
        return collection;
    }
    const get_style = (feature) => {
        let style = {
            color: 'red'
        }
        if(feature.properties.selected) {
            style.color = 'blue';
        }
        else {
            style.color = 'red';
        }
        return style;
    }

// EXAMPLE thumbnail vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

    // logic for adding the overlays to the map needs to go in this effect,
    // this effect will only trigger if images changes, hence the [images]
    React.useEffect(() => {
        console.log('images changed');
        // logic that we need:
        // if image.display_thumbnail and image.visible:
        //    display_thumbnail
        // else if image.visible:
        //    display geojson
    }, [images]);

    // this imageDisplayed state helps us only display once, which should only be for this hard coded example
    const [imageDisplayed, setImageDisplayed] =  React.useState(false);

    // this is hard coding the image to a spot on the map and jumping there
    if(mapRef?.current?.leafletElement) {
        if(!imageDisplayed) {
            var topleft    = L.latLng(40.52256691873593, -3.7743186950683594),
            topright   = L.latLng(40.5210255066156, -3.7734764814376835),
            bottomleft = L.latLng(40.52180437272552, -3.7768453359603886);
            console.log('display')
            let url; // modify this url, when I uncomment the line below it works when path is to a jpg
            // url = "C:\\Users\\jcollins\\dev\\capstone\\data\\Pearl6_Alcatraz\\2017May10_225223_16100298_3c4c9600607e14bdbdfdc6c053d24a2bthumb.jpg";
            var overlay = L.imageOverlay.rotated(url, topleft, topright, bottomleft, {
                opacity: 0.5,
                interactive: true,
                attribution: "&copy; <a href='http://www.ign.es'>Instituto Geográfico Nacional de España</a>"
            });
            mapRef.current.leafletElement.addLayer(overlay);
            var	bounds = new L.LatLngBounds(topleft, topright).extend(bottomleft);
            mapRef.current.leafletElement.fitBounds(bounds);
            setImageDisplayed(true);
        }
    }
// EXAMPLE thumbnail ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
                    <GeoJSON key={hash(images)} ref={geoJsonRef} data={get_data(images)} style={get_style}/>
                    <DrawTools selectByGeoJSON={selectByGeoJSON}/>
                </Map>
            </main>
            <ZoomLatLngBox classes={classes} zoom={zoom} latlng={mouse}/>
        </React.Fragment>
    )
};

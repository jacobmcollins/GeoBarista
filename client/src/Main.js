// React Components
import React, { createRef } from 'react';

// File dialog
import fileDialog from 'file-dialog';

// Material UI Core components
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// React Leaflet component
import { Map, TileLayer,} from 'react-leaflet';
// React Leaflet Draw components


// Our components
import Header from './components/Header';
import ZoomLatLngBox from './components/ZoomLatLngBox';
import ToolBox from './components/ToolBox';
import MainMenu from './components/MainMenu';
import ImageMenu from './components/ImageMenu';
import Client from './Client';
import DrawTools from './components/DrawTools';

const useStyles = makeStyles((theme) => ({
    appbar: {
        position: 'absolute',
        height: '10vh',
    },
    imageFab: {
        position: 'absolute',
        right: theme.spacing(2)
    },
    main: {
        zIndex: 0,
        position: 'absolute',
        top: '0vh',
        left: '0vh',
        height: '100vh',
        width: '100%',
    },
    mainShifted: {
        zIndex: 0,
        position: 'absolute',
        top: '0vh',
        left: '0vh',
        height: '100vh',
        width: 'calc(100% - 50vw)',
    },
    mainMenu: {
        width: 240,
    },
    imageMenu: {
        width: '50vw',
    },
    imageMenuCloseButton: {
        position: 'relative',
        right: theme.spacing(2)
    },
    menuFab: {
        position: 'absolute',
        left: theme.spacing(2)
    },
    root: {
        height: '100vh',
        width: '100vw'
    },
    toolbar: {
        zIndex: 1,
    },
    zoomlatlongbox: {
        position: 'absolute',
        zIndex: 1,
        bottom: '2vh',
        left: '2vw',
    },
    ToolBox: {
        position: 'absolute',
        zIndex: 1,
        top: '1vh',
        left: '8vw',
    }
}));
const mapRef = createRef();

function Main() {
    var boundup = [45.51,-122.68];
    var bounddown = [45.51,-122.68];
    const classes = useStyles();
    const [state, setState] = React.useState({
        mainMenuOpen: false,
        imageMenuOpen: false,
        toolselection: "none",
        bstate: false,
        map: {
            zoom: 13,
            center_latlng: {
                lat: 45.51,
                lng: -122.68,
            },
            mouse_latlng: {
                lat: 51.505,
                lng: -0.09,
            }
        },
        poly: [],
        bounds: [boundup,bounddown],
        markers: [45.51,-122.68],
        images: [],
    });
    const handleOnMouseMove = (e) => {
        if(!mapRef.current) return;
        setState({
            ...state,
            map: {
                ...state.map,
                mouse_latlng: e.latlng
            }
        })
    }
    const handleZoom = (e) => {
        if(!mapRef.current) return;
        setState({
            ...state,
            map: {
                ...state.map,
                zoom: mapRef.current.leafletElement.getZoom()
            }
        })
    }
    const toggleMainMenu = (open) => error => {
        setState({
            ...state,
            mainMenuOpen: open
        })
    }
    const toggleImageMenu = (open) => error => {
        setState({
            ...state,
            imageMenuOpen: open
        })
    }
    const openDialog = async () => {
        var f = [];
        var files = await fileDialog({ multiple: true });
        var i;
        for (i=0; i < files.length; i++) {
            var data = await Client.load(files[i]);
            console.log(data);
            f.push({
                file: data.description
            });
        }
        console.log(f)
        console.log(state.images)
        setState({
            ...state,
            images: state.images.concat(f)
        });
    }
    const handleOnClick = (e) => {
        console.log("i clicked")
    }
    const setTool = (value) => error => {
        setState({
            ...state,
            toolselection: value
        })
        console.log("tool change");
    }
    const updateMarkerPos = () => {
        setState({
            ...state,
            markers: [state.map.mouse_latlng.lat, state.map.mouse_latlng.lng],
        })
    }

    return (
        <div className={classes.root} >
            <CssBaseline />
            <Header classes={classes} toggleMainMenu={toggleMainMenu} toggleImageMenu={toggleImageMenu} />
            <main className={state.imageMenuOpen ? classes.mainShifted : classes.main}>
                <Map 
                    center={state.map.center_latlng} 
                    length={4}
                    onmousemove={handleOnMouseMove}
                    onzoomend={handleZoom}
                    onclick={handleOnClick}
                    ref={mapRef}
                    zoom={state.map.zoom}
                    style={{height: "100%", width: "100%"}}
                    zoomControl={false}
                >
                    <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <DrawTools/>
                </Map>
            </main>
            <ZoomLatLngBox classes={classes} zoom={state.map.zoom} latlng={state.map.mouse_latlng}/>
            <MainMenu classes={classes} open={state.mainMenuOpen} toggleMainMenu={toggleMainMenu} openDialog={openDialog}/>
            <ImageMenu classes={classes} open={state.imageMenuOpen} toggleImageMenu={toggleImageMenu} images={state.images} />
        </div>
    )
}

export default Main

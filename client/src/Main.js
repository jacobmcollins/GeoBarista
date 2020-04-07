// React Components
import React, { createRef } from 'react';

// File dialog
import fileDialog from 'file-dialog';

// Material UI Core components
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// React Leaflet component
import { Map, TileLayer } from 'react-leaflet';

// Our components
import Header from './components/Header';
import ZoomLatLngBox from './components/ZoomLatLngBox';
import MainMenu from './components/MainMenu';
import ImageMenu from './components/ImageMenu';
import Client from './Client';
import ComLineOptions from './components/ComLineOptions';
import { setLocStorage } from './Tools/initLocStorage';

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
    appBarOptions: {
        position: 'relative',
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    randomButton: {
        zIndex: 999,
        position: 'absolute'
    }
}));
const mapRef = createRef();

function Main() {
    const classes = useStyles();
    const [optionsMenuOpen, setOptionsMenuOpen] = React.useState(false)
    const [state, setState] = React.useState({
        mainMenuOpen: false,
        optionsMenuOpen: false,
        imageMenuOpen: false,
        map: {
            zoom: 13,
            center_latlng: {
                lat: 45.51,
                lng: -122.68
            },
            mouse_latlng: {
                lat: 51.505,
                lng: -0.09
            }
        },
        images: [],
        thumbnailsData: ''
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
    const toggleOptionsMenu = (open) => error => {
        setOptionsMenuOpen(open)

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
    const getTextToDisplay = (toDisplay) => {
        return (toDisplay[0] + ": ");
    }
    const saveData = () => {
        setLocStorage(state.thumbnailsData);
        setState({...state});
    }
    const handleTextField = (e) => {
        setState({
            ...state,
            thumbnailsData: e.target.value
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
                    ref={mapRef}
                    zoom={state.map.zoom}
                    style={{height: "100%", width: "100%"}}
                    zoomControl={false}
                >
                    <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </Map>
            </main>
            <ZoomLatLngBox classes={classes} zoom={state.map.zoom} latlng={state.map.mouse_latlng}/>
            <MainMenu
                classes={classes}
                open={state.mainMenuOpen}
                toggleMainMenu={toggleMainMenu}
                openDialog={openDialog}
                toggleOptionsMenu={toggleOptionsMenu}
            />
            <ImageMenu classes={classes}
                       open={state.imageMenuOpen}
                       toggleImageMenu={toggleImageMenu}
                       images={state.images}
            />
            <ComLineOptions
                classes={classes}
                optionsMenuOpen={optionsMenuOpen}
                getTextToDisplay={getTextToDisplay}
                toggleOptionsMenu={toggleOptionsMenu}
                saveData={saveData}
                handleTextField={handleTextField}
            />
        </div>
    )
}

export default Main

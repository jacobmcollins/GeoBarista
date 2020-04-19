// React Components
import React, { createRef } from 'react';

// File dialog
import fileDialog from 'file-dialog';

// Material UI Core components
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import GeoBaristaMap from './components/Map/GeoBaristaMap';
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import ImageMenu from './components/ImageMenu/ImageMenu';
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
    }
}));

function Main() {
    const classes = useStyles();
    const [optionsMenuOpen, setOptionsMenuOpen] = React.useState(false)
    const [images, setImages] = React.useState(Array());
    const [sortParams, setSortParams] = React.useState({
        'base_name': 'ascending'
    });
    const [filterParams, setFilterParams] = React.useState({});
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
    const selectImageById = async (id, value) => {
        let success = await Client.update(id, 'selected', value);
        if(success) {
            let res = await Client.get(filterParams, sortParams);
            setImages(res.data);
        }
    }
    const setImageVisibleById = async (id, value) => {
        let success = await Client.update(id, 'visible', value);
        if(success) {
            let res = await Client.get(filterParams, sortParams);
            setImages(res.data);
        }
    }
    const sortImages = async (field, direction) => {
        let res = await Client.get(filterParams, sortParams);
        setImages(res.data);
    }
    const openDialog = async () => {
        var files = await fileDialog({ multiple: true });
        var i;
        var fileObj = [];
        for (i=0; i < files.length; i++) {
            var name = files[i].name;
            var path = files[i].path;
            var fileData = {
                "name": name,
                "path": path
            };
            fileObj.push(fileData);
        }
        //var payload = JSON.stringify(fileObj);
        var data = await Client.load(fileObj);
        let res = await Client.get(filterParams, sortParams);
        setImages(res.data);
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
            <GeoBaristaMap 
                classes={classes} 
                imageMenuOpen={state.imageMenuOpen} 
                images={images}
                selectImageById={selectImageById}
            />
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
                       images={images}
                       openDialog={openDialog}
                       selectImageById={selectImageById}
                       setImageVisibleById={setImageVisibleById}
                       sortImages={sortImages}
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

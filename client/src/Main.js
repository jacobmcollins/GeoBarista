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
import { setLocStorage, thumbnails, geojson } from './Tools/initLocStorage';
import FileManipulationButton from './components/FileManipulationButton';

const fileRef = createRef();
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
    FileManipulationButton: {
        paper: {
            background: "white",
        },
        height: '100vh',
        zIndex: 2,
    }

}));

function Main() {
    const classes = useStyles();
    const [optionsMenuOpen, setOptionsMenuOpen] = React.useState(false)
    const [images, setImages] = React.useState(Array());
    const [sortParams, setSortParams] = React.useState({
        'mission': 1,
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
        thumbnailsData: '',
        geoJSONData: ''
    });
    const toggleMainMenu = (open) => error => {
        setState({
            ...state,
            mainMenuOpen: open
        })
    }
    const toggleOptionsMenu = (open) => error => {
        setOptionsMenuOpen(open)
        setState({
            ...state,
            thumbnailsData: '',
            geoJSONData: ''
        })
    }
    const toggleImageMenu = (open) => error => {
        setState({
            ...state,
            imageMenuOpen: open
        })
    }
    const selectImageById = async (id, value) => {
        let success = await Client.update(id, 'selected', value);
        if (success) {
            let res = await Client.get(filterParams, sortParams);
            setImages(res.data);
        }
    }
    const selectImagesById = async (id_map) => {
        let i;
        for (i = 0; i < id_map.select.length; i++) {
            await Client.update(id_map.select[i], 'selected', true);
        }
        for (i = 0; i < id_map.unselect.length; i++) {
            await Client.update(id_map.unselect[i], 'selected', false);
        }
        let res = await Client.get(filterParams, sortParams);
        setImages(res.data);
    }
    const setImageVisibleById = async (id, value) => {
        let success = await Client.update(id, 'visible', value);
        if (success) {
            let res = await Client.get(filterParams, sortParams);
            setImages(res.data);
        }
    }
    const sortImages = async (field, direction, fieldSecondary, directionSecondary) => {
        // if there is a secondary sort
        if (directionSecondary) {
            let res = await Client.get(filterParams, { [field]: direction, [fieldSecondary]: directionSecondary });
            setImages(res.data);
            await setSortParams({
                [field]: direction, [fieldSecondary]: directionSecondary
            });
        }
        // if there is only a primary sort
        else {
            let res = await Client.get(filterParams, { [field]: direction });
            setImages(res.data);
            await setSortParams({
                [field]: direction
            });
        }
    }
    const filterImages = async (newFilterParams) => {
        let res = await Client.get(newFilterParams, sortParams);
        setImages(res.data);
        setFilterParams(newFilterParams);
    }
    const onChange = async (e) => {
        var files = fileRef.current.files;
        console.log('files', files)
        var i;
        var fileObj = [];
        for (i = 0; i < files.length; i++) {
            console.log('file', files[i])
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
    const openDialog = async () => {
        console.log("fileref: ", fileRef);
        fileRef.current.click();
    }
    const getTextToDisplay = (toDisplay) => {
        return (toDisplay[0] + ": ");
    }
    const forceStateRefresh = () => {
        setState({ ...state });
    }
    const saveData = () => {
        if (state.thumbnailsData !== '') {
            setLocStorage(thumbnails, state.thumbnailsData);
        }
        if (state.geoJSONData !== '') {
            setLocStorage(geojson, state.geoJSONData);
        }
        forceStateRefresh();
    }
    const handleThumbnails = (e) => {
        setState({
            ...state,
            thumbnailsData: e.target.value
        })
    }
    const handleGeoJSON = (e) => {
        setState({
            ...state,
            geoJSONData: e.target.value
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
                selectImagesById={selectImagesById}
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
                filterImages={filterImages}
                FileManipulationButton={FileManipulationButton}
            />
            <ComLineOptions
                classes={classes}
                optionsMenuOpen={optionsMenuOpen}
                getTextToDisplay={getTextToDisplay}
                toggleOptionsMenu={toggleOptionsMenu}
                saveData={saveData}
                handleThumbnails={handleThumbnails}
                handleGeoJSON={handleGeoJSON}
                forceStateRefresh={forceStateRefresh}
            />
            <input directory="" webkitdirectory="" multiple="" type="file" id="file" ref={fileRef} onChange={onChange} style={{ display: "none" }} />
        </div>
    )
}

export default Main

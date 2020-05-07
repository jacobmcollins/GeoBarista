
import React, { createRef } from 'react';
import { Grid, Button, TableBody, TableRow, Checkbox, IconButton } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import Client from '../Client';
import { destination } from '@turf/turf';
import fileManipulation from './FileManipulationActions';


// not yet implemented :
//  get count of file extensions from inputFiles
//  get count of custom file extension
//  perform action *currently only displays manipulation properties state
//

export default function FileManipulationMenu(props) {
    const inputFiles = props.inputFiles;
    const classes = props.classes;
    const open = props.open;
    const onClose = props.onClose;
    const [selectedFiles, setSelectedFiles] = React.useState();
    const { dialog } = window.require('electron').remote;
    const [ManipulationProperties, SetManipulationProperties] = React.useState({
        action: 'Copy',
        thumbnailImages: false,
        CR2: false,
        TIF: false,
        URW: false,
        NTF: false,
        JPG: false,
        CSV: false,
        PPJ: false,
        allFiles: false,
        custom: false,
        customText: '',
        destinationDirectory: '',
        overwrite: false,
    });
    const [ManipulationCount, SetManipulationCount] = React.useState({
        thumbnailImagesCount: 0,
        CR2Count: 0,
        TIFCount: 0,
        URWCount: 0,
        NTFCount: 0,
        JPGCount: 0,
        CSVCount: 0,
        PPJCount: 0,
        allFilesCount: 0,
        customCount: 0,
        selectedCount: 0,
    });


    const boarderDivStyle = {
        borderTop: '2px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    // todo where the Actions calls to be executed will be called
    const executeAction = async (action, actionDirectory, actionFiles, overwrite) => {
        console.log("Performing : ", action);
        let destExists = false;
        let DBsuccess = true;
        if (action != "Delete") {
            console.log("Destination :", actionDirectory);
        }
        console.log("On", actionFiles.length, " files");
        if (action === "Delete") {
            DBsuccess = await Client.removeFilesByBasePath(actionFiles);
            if (DBsuccess) {
                for (var file in actionFiles) {
                    fileManipulation.deleteFile(actionFiles[file].path);
                }
            }
        }
        else if (action === "Copy") {
            console.log("OVERWRITE : ", overwrite);
            if (!overwrite) {
                for (var file in actionFiles) {
                    destExists = fileManipulation.checkOverwrite(actionDirectory, actionFiles[file].name);
                    console.log("dest exists : ", destExists);
                    if (destExists === true) {
                        alert("Canceling copy. A file already exsists at destination with the same name, check overwrite to force copy");
                        break;
                    }
                }
            }
            if (!destExists) {
                for (var file in actionFiles) {
                    console.log("action name :", actionFiles[file].name);
                    fileManipulation.copyFile(actionFiles[file].path, actionDirectory, actionFiles[file].name);
                }
            }
        }
        else if (action === "Move") {
            console.log("OVERWRITE : ", overwrite);
            if (!overwrite) {
                for (var file in actionFiles) {
                    destExists = fileManipulation.checkOverwrite(actionDirectory, actionFiles[file].name);
                    console.log("dest exists : ", destExists);
                    if (destExists === true) {
                        alert("Canceling move. A file already exsists at destination with the same name, check overwrite to force move");
                        break;
                    }
                }
            }
            if (!destExists) {
                for (var file in actionFiles) {
                    console.log("action name :", actionFiles[file].name);
                    fileManipulation.moveFile(actionFiles[file].path, actionDirectory, actionFiles[file].name);
                }
                DBsuccess = await Client.removeFilesByBasePath(actionFiles);
            }
        }
        if (!destExists && DBsuccess) {
            alert(action + " Completed");
        }

    }

    // handles sending the manipulation state to where the
    // manipulation will be performed
    const performAction = () => {
        let action = ManipulationProperties.action;
        let actionDirectory = ManipulationProperties.destinationDirectory;
        let actionFiles = [];
        let overwrite = ManipulationProperties.overwrite;
        if ((actionDirectory === "" || actionDirectory === undefined) && action != "Delete") {
            alert("A Destination Directory must be selected to perfom action");
        }
        else {
            if (ManipulationProperties.allFiles === true) {
                for (var i in selectedFiles) {
                    actionFiles.push({ path: selectedFiles[i].path, name: selectedFiles[i].filename, base_path: selectedFiles[i].base_path });
                }
            }
            else {
                for (var i in selectedFiles) {
                    if (selectedFiles[i].thumb === true && ManipulationProperties.thumbnailImages === true) {
                        actionFiles.push({ path: selectedFiles[i].path, name: selectedFiles[i].filename, base_path: selectedFiles[i].base_path });
                    }
                    else if (selectedFiles[i].extension === '.cr2' && ManipulationProperties.CR2 === true) {
                        actionFiles.push({ path: selectedFiles[i].path, name: selectedFiles[i].filename, base_path: selectedFiles[i].base_path });
                    }
                    else if (selectedFiles[i].extension === '.tif' && ManipulationProperties.TIF === true) {
                        actionFiles.push({ path: selectedFiles[i].path, name: selectedFiles[i].filename, base_path: selectedFiles[i].base_path });
                    }
                    else if (selectedFiles[i].extension === '.urw' && ManipulationProperties.URW === true) {
                        actionFiles.push({ path: selectedFiles[i].path, name: selectedFiles[i].filename, base_path: selectedFiles[i].base_path });
                    }
                    else if (selectedFiles[i].extension === '.ntf' && ManipulationProperties.NTF === true) {
                        actionFiles.push({ path: selectedFiles[i].path, name: selectedFiles[i].filename, base_path: selectedFiles[i].base_path });
                    }
                    else if (selectedFiles[i].extension === '.jpg' && ManipulationProperties.JPG === true) {
                        actionFiles.push({ path: selectedFiles[i].path, name: selectedFiles[i].filename, base_path: selectedFiles[i].base_path });
                    }
                    else if (selectedFiles[i].extension === '.csv' && ManipulationProperties.CSV === true) {
                        actionFiles.push({ path: selectedFiles[i].path, name: selectedFiles[i].filename, base_path: selectedFiles[i].base_path });
                    }
                    else if (selectedFiles[i].extension === '.ppj' && ManipulationProperties.PPJ === true) {
                        actionFiles.push({ path: selectedFiles[i].path, name: selectedFiles[i].filename, base_path: selectedFiles[i].base_path });
                    }
                    else if (selectedFiles[i].extension === ManipulationProperties.customText && ManipulationProperties.custom === true) {
                        actionFiles.push({ path: selectedFiles[i].path, name: selectedFiles[i].filename, base_path: selectedFiles[i].base_path });
                    }
                }
            }
            executeAction(action, actionDirectory, actionFiles, overwrite);
            handleClose();
        }
    }

    //opens the file select dialog
    const openFolderDialog = async () => {
        var dialogOut = await dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        SetManipulationProperties({
            ...ManipulationProperties,
            destinationDirectory: dialogOut.filePaths[0]
        })
    }
    // gets file data from file select dialog
    // TODO find a way to be able to select folders and not files
    // const getFolder = async (e) => {
    //     var folder = folderRef.current.files;
    //     console.log('folder: ', folder);
    //     var path = folder.path;
    //     console.log("path :", path);

    // }

    //when dialog opens get the total file count
    //TODO update file extension counts too 
    const handleOpen = async () => {
        const returnedFiles = await Client.fileManip();
        setSelectedFiles(returnedFiles.data);
        console.log(returnedFiles.data);
        await getCounts(returnedFiles.data);
    }
    const getCounts = async (files) => {
        let thumbnailImagesCount = 0;
        let CR2Count = 0;
        let TIFCount = 0;
        let URWCount = 0;
        let NTFCount = 0;
        let JPGCount = 0;
        let CSVCount = 0;
        let PPJCount = 0;
        let customCount = 0;
        for (var i in files) {
            if (files[i].thumb) {
                thumbnailImagesCount++;
            }
            else {
                if (files[i].extension === '.cr2' && !files[i].thumb) {
                    CR2Count++;
                }
                else if (files[i].extension === '.tif' && !files[i].thumb) {
                    TIFCount++;
                }
                else if (files[i].extension === '.urw' && !files[i].thumb) {
                    URWCount++;
                }
                else if (files[i].extension === '.ntf' && !files[i].thumb) {
                    NTFCount++;
                }
                else if (files[i].extension === '.jpg' && !files[i].thumb) {
                    JPGCount++;
                }
                else if (files[i].extension === '.csv' && !files[i].thumb) {
                    CSVCount++;
                }
                else if (files[i].extension === '.ppj' && !files[i].thumb) {
                    PPJCount++;
                }
                else if (!files[i].thumb) {
                    console.log("CUSTOM : ", files[i].extension)
                    customCount++;
                }
            }
        }
        SetManipulationCount({
            ...ManipulationCount,
            thumbnailImagesCount: thumbnailImagesCount,
            CR2Count: CR2Count,
            TIFCount: TIFCount,
            URWCount: URWCount,
            NTFCount: NTFCount,
            JPGCount: JPGCount,
            CSVCount: CSVCount,
            PPJCount: PPJCount,
            customCount: customCount,
            allFilesCount: files.length,
            selectedCount: 0,
        })
    }



    // close dialog by -- switching open state in finalManipulationButton to false
    const handleClose = () => {
        SetManipulationProperties({
            ...ManipulationProperties,
            thumbnailImages: false,
            CR2: false,
            TIF: false,
            URW: false,
            NTF: false,
            JPG: false,
            CSV: false,
            PPJ: false,
            allFiles: false,
            custom: false,
            overwrite: false,
        })
        onClose();
    };

    //set manipulation action IE move,copy,delete
    const setAction = (setAction) => {
        SetManipulationProperties({
            ...ManipulationProperties,
            action: setAction
        });
    }
    const setOverwrite = (field, value) => {
        SetManipulationProperties({
            ...ManipulationProperties,
            [field]: value,
        });
    }

    //sets the selected flag for file extension checkboxes
    const setFileTypes = (field, value) => {
        let select = getTotalSelectedCount(field, value);
        SetManipulationProperties({
            ...ManipulationProperties,
            [field]: value,
        });
        SetManipulationCount({
            ...ManipulationCount,
            selectedCount: select

        })
    }

    //sets the manipulationPropertie customText field
    // TODO get the count of files that have inputText file extentison
    // and update customText count with that number
    const handleCustomTextChange = (inputText) => {
        SetManipulationProperties({
            ...ManipulationProperties,
            customText: inputText.target.value
        })
    }

    //sets the manipulationPropertie destination directory to the inputText value
    // TODO 
    const handleDestinationDirectoryText = (inputText) => {
        SetManipulationProperties({
            ...ManipulationProperties,
            destinationDirectory: inputText.target.value
        })
    }

    // returns the count of all selected file properties
    const getTotalSelectedCount = (field, value) => {
        let totalcount = ManipulationCount.selectedCount;

        //allFiles selected adds allfilecount to selectedCount
        //allFiles unselected subtracts allfilecount minus other selected fields from selectedCount
        if (field === 'allFiles') {
            value === true ? totalcount = ManipulationCount.allFilesCount
                : totalcount -= ManipulationCount.allFilesCount
                - ((ManipulationProperties.thumbnailImages === true ? ManipulationCount.thumbnailImagesCount : 0)
                    + (ManipulationProperties.CR2 === true ? ManipulationCount.CR2Count : 0)
                    + (ManipulationProperties.TIF === true ? ManipulationCount.TIFCount : 0)
                    + (ManipulationProperties.URW === true ? ManipulationCount.URWCount : 0)
                    + (ManipulationProperties.NTF === true ? ManipulationCount.NTFCount : 0)
                    + (ManipulationProperties.JPG === true ? ManipulationCount.JPGCount : 0)
                    + (ManipulationProperties.CSV === true ? ManipulationCount.CSVCount : 0)
                    + (ManipulationProperties.PPJ === true ? ManipulationCount.PPJCount : 0)
                    + (ManipulationProperties.custom === true ? ManipulationCount.customCount : 0))
        }
        //allfiles unselected adds or subtracts to selectedCount 
        if (ManipulationProperties.allFiles === false) {
            if (field === 'thumbnailImages') { value === true ? totalcount += ManipulationCount.thumbnailImagesCount : totalcount -= ManipulationCount.thumbnailImagesCount }
            if (field === 'CR2') { value === true ? totalcount += ManipulationCount.CR2Count : totalcount -= ManipulationCount.CR2Count }
            if (field === 'TIF') { value === true ? totalcount += ManipulationCount.TIFCount : totalcount -= ManipulationCount.TIFCount }
            if (field === 'URW') { value === true ? totalcount += ManipulationCount.URWCount : totalcount -= ManipulationCount.URWCount }
            if (field === 'NTF') { value === true ? totalcount += ManipulationCount.NTFCount : totalcount -= ManipulationCount.NTFCount }
            if (field === 'JPG') { value === true ? totalcount += ManipulationCount.JPGCount : totalcount -= ManipulationCount.JPGCount }
            if (field === 'CSV') { value === true ? totalcount += ManipulationCount.CSVCount : totalcount -= ManipulationCount.CSVCount }
            if (field === 'PPJ') { value === true ? totalcount += ManipulationCount.PPJCount : totalcount -= ManipulationCount.PPJCount }
            if (field === 'custom') { value === true ? totalcount += ManipulationCount.customCount : totalcount -= ManipulationCount.customCount }
        }
        return totalcount;
    }

    //Action Section of dialog
    const ManipulationActionButtonGroup = [
        <ToggleButtonGroup size="medium" value={ManipulationProperties.action} exclusive>
            <ToggleButton key={1} color='black' value='Copy' onClick={() => setAction('Copy')}>
                Copy Files
            </ToggleButton>,
            <ToggleButton key={2} value='Move' onClick={() => setAction('Move')}  >
                Move Files
            </ToggleButton>,
            <ToggleButton key={3} value='Delete' onClick={() => setAction('Delete')}  >
                Delete Files
            </ToggleButton>,
        </ToggleButtonGroup>
    ]

    //File Extension section of dialog
    const ManipulationFileTypes = (
        <React.Fragment>
            <Grid container>
                <Grid item>
                    <TableBody>
                        <TableRow>
                            <Checkbox
                                color={'default'}
                                checked={ManipulationProperties.thumbnailImages}
                                onChange={((e) => {
                                    setFileTypes('thumbnailImages', e.target.checked);
                                })}
                            />
                                Thumbnails - {ManipulationCount.thumbnailImagesCount}
                            {" matches"}
                        </TableRow>
                        <TableRow>
                            <Checkbox
                                color={'default'}
                                checked={ManipulationProperties.CR2}
                                onChange={((e) => {
                                    setFileTypes('CR2', e.target.checked);
                                })}
                            />
                                CR2 - {ManipulationCount.CR2Count}
                            {" matches"}
                        </TableRow>
                        <TableRow>
                            <Checkbox
                                color={'default'}
                                checked={ManipulationProperties.TIF}
                                onChange={((e) => {
                                    setFileTypes('TIF', e.target.checked);
                                })}
                            />
                                TIF - {ManipulationCount.TIFCount}
                            {" matches"}
                        </TableRow>
                        <TableRow>
                            <Checkbox
                                color={'default'}
                                checked={ManipulationProperties.URW}
                                onChange={((e) => {
                                    setFileTypes('URW', e.target.checked);
                                })}
                            />
                                URW - {ManipulationCount.URWCount}
                            {" matches"}
                        </TableRow>
                    </TableBody>
                </Grid>
                <Grid item>
                    <TableBody>
                        <TableRow>
                            <Checkbox
                                color={'default'}
                                checked={ManipulationProperties.NTF}
                                onChange={((e) => {
                                    setFileTypes('NTF', e.target.checked);
                                })}
                            />
                                NTF - {ManipulationCount.NTFCount}
                            {" matches"}
                        </TableRow>
                        <TableRow>
                            <Checkbox
                                color={'default'}
                                checked={ManipulationProperties.JPG}
                                onChange={((e) => {
                                    setFileTypes('JPG', e.target.checked);
                                })}
                            />
                                JPG - {ManipulationCount.JPGCount}
                            {" matches"}
                        </TableRow>
                        <TableRow>
                            <Checkbox
                                color={'default'}
                                checked={ManipulationProperties.CSV}
                                onChange={((e) => {
                                    setFileTypes('CSV', e.target.checked);
                                })}
                            />
                                CSV - {ManipulationCount.CSVCount}
                            {" matches"}
                        </TableRow>
                        <TableRow>
                            <Checkbox
                                color={'default'}
                                checked={ManipulationProperties.PPJ}
                                onChange={((e) => {
                                    setFileTypes('PPJ', e.target.checked);
                                })}
                            />
                                PPJ - {ManipulationCount.PPJCount}
                            {" matches"}
                        </TableRow>
                        <TableRow>
                            <Checkbox
                                color={'default'}
                                checked={ManipulationProperties.allFiles}
                                onChange={((e) => {
                                    setFileTypes('allFiles', e.target.checked);
                                })}
                            />
                                All Files - {ManipulationCount.allFilesCount}
                            {" matches"}
                        </TableRow>
                    </TableBody>
                </Grid>
            </Grid>
            <div style={{ divStyle }}>
                <Checkbox
                    color={'default'}
                    checked={ManipulationProperties.custom}
                    onChange={((e) => {
                        setFileTypes('custom', e.target.checked);
                    })}
                />
                <TextField
                    id="Custom"
                    label={"Custom File Extension"}
                    value={ManipulationProperties.customText}
                    onChange={(e) => handleCustomTextChange(e)} variant="standard" />
                     - {ManipulationCount.customCount}
                {" matches"}
            </div>
            <div style={divStyle}>
                <h6> Total Files : {ManipulationCount.allFilesCount} - Total Matches : {ManipulationCount.selectedCount} </h6>
            </div>
        </React.Fragment >
    )

    // directory selection section of dialog
    const ManipulationDirrectory = (
        <React.Fragment>
            <div style={divStyle}>
                <TextField
                    id="destinationDirectory"
                    label={"Destination Directory"}
                    value={ManipulationProperties.destinationDirectory}
                    onChange={(e) => handleDestinationDirectoryText(e)}
                    variant={ManipulationProperties.action === 'Delete' ? "filled" : "outlined"}
                    disabled={ManipulationProperties.action === 'Delete' ? true : false} />
                <IconButton
                    onClick={openFolderDialog}
                    disabled={ManipulationProperties.action === 'Delete' ? true : false} >
                    <PermMediaIcon />
                </IconButton>

            </div>
            <div style={divStyle}>
                <Checkbox
                    color={'default'}
                    disabled={ManipulationProperties.action === 'Delete' ? true : false}
                    checked={ManipulationProperties.overwrite}
                    onChange={((e) => {
                        setOverwrite('overwrite', e.target.checked);
                    })}
                />
                {ManipulationProperties.action === 'Delete' ? <del>overwrite existing files</del> : "overwrite existing files"}
            </div>
        </React.Fragment>
    )

    //Main dialog section
    return (
        <Dialog onEnter={async () => { await handleOpen() }} onClose={handleClose} aria-labelledby="File-manipulation-menus" open={open}>
            <DialogTitle style={divStyle} id="File-manipulation-menus">File-Manipulation-Menu</DialogTitle>
            <TableBody>
                <TableRow>
                    <div style={boarderDivStyle} >
                        <h5>Action Type</h5>
                    </div>
                    <div style={divStyle} >
                        {ManipulationActionButtonGroup}
                    </div>
                </TableRow>
                <TableRow>
                    <div style={boarderDivStyle}>
                        <h5>File Types to {ManipulationProperties.action} </h5>
                    </div>
                    {ManipulationFileTypes}
                </TableRow>
                <TableRow>
                    <div style={boarderDivStyle}>
                        <h5>Destination Directory</h5>
                    </div>
                    {ManipulationDirrectory}
                </TableRow>
                <TableRow>
                    <div style={boarderDivStyle}>
                        <Button color="secondary" size="large" variant="outlined" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button color="primary" size="large" variant="outlined" onClick={performAction}>
                            Perform {ManipulationProperties.action}
                        </Button>
                    </div>
                </TableRow>
            </TableBody>
        </Dialog >
    );
}

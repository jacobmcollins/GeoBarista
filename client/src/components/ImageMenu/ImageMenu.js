import React from 'react'
import {Drawer, Toolbar, IconButton} from '@material-ui/core';
import {Cancel as CancelIcon} from '@material-ui/icons';
import ImageTable from "./ImageTable";
import ImageMenuToolbar from "./ImageMenuToolbar";

export default function ImageMenu(props) {
    const {classes, toggleImageMenu, open, images, openDialog, selectImageById, sortImages} = props;

    return (
        <Drawer variant="persistent" anchor="right" open={open} onClose={toggleImageMenu(false)}>
            <div className={classes.imageMenu} role="presentation">
                <Toolbar className={classes.toolbar}>
                    <IconButton size="small" onClick={toggleImageMenu(false)}>
                        <CancelIcon />
                    </IconButton >
                </Toolbar>
                <ImageMenuToolbar 
                    openDialog={openDialog} 
                />
                <ImageTable images={images} selectImageById={selectImageById} openDialog={openDialog}/>
            </div>
        </Drawer>
    )
}

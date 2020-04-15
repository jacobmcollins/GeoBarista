import React from 'react'
import {Drawer, Toolbar, IconButton} from '@material-ui/core';
import {Cancel as CancelIcon} from '@material-ui/icons';
import MUIDataTable from "mui-datatables";
import CustomToolbar from "./CustomToolbar";
import ImageTable from "./ImageTable";

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
                <CustomToolbar classes={classes} openDialog={openDialog}/>
                <ImageTable images={images} selectImageById={selectImageById}/>
            </div>
        </Drawer>
    )
}

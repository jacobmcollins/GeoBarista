import React from 'react'
import {Drawer, Toolbar, IconButton} from '@material-ui/core';
import {Cancel as CancelIcon} from '@material-ui/icons';
import ImageTable from "./ImageTable";
import ImageMenuToolbar from "./ImageMenuToolbar";
import ImageMenuFilterDialog from "./ImageMenuFilterDialog";
import ImageMenuSortDialog from "./ImageMenuSortDialog";

export default function ImageMenu(props) {
    const {classes, toggleImageMenu, open, images, openDialog, selectImageById, sortImages, setImageVisibleById, filterImages} = props;
    const [filterDialogOpen, setFilterDialogOpen] = React.useState(false);
    const [sortDialogOpen, setSortDialogOpen] = React.useState(false);

    const toggleFilterDialogOpen = (open) => {
        setFilterDialogOpen(open);
    };

    const toggleSortDialogOpen = (open) => {
        setSortDialogOpen(open);
    };

    const columns = [
        {
            id: 'file_extension',
            label: 'File Extension'
        },
        {
            id: 'mission',
            label: 'Mission'
        },
        {
            id: 'camera',
            label: 'Camera'
        },
        {
            id: 'fov',
            label: 'FOV'
        },
        {
            id: 'lla',
            label: 'LLA'
        },
        {
            id: 'velocity',
            label: 'Velocity'
        },
        {
            id: 'gsd',
            label: 'GSD'
        },
    ]

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
                    toggleFilterDialogOpen={toggleFilterDialogOpen}
                    toggleSortDialogOpen={toggleSortDialogOpen}
                />
                <ImageTable 
                    images={images} 
                    columns={columns}
                    selectImageById={selectImageById} 
                    setImageVisibleById={setImageVisibleById}
                    openDialog={openDialog}
                />
                <ImageMenuFilterDialog 
                    images={images} 
                    columns={columns}
                    filterImages={filterImages}
                    open={filterDialogOpen}
                    toggleFilterDialogOpen={toggleFilterDialogOpen}
                />
                <ImageMenuSortDialog 
                    open={sortDialogOpen}
                    toggleSortDialogOpen={toggleSortDialogOpen}
                />
            </div>
        </Drawer>
    )
}

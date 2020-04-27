import React from 'react'
import { Drawer, Toolbar, IconButton } from '@material-ui/core';
import { Cancel as CancelIcon } from '@material-ui/icons';
import ImageTable from "./ImageTable";
import ImageMenuToolbar from "./ImageMenuToolbar";
import ImageMenuFilterDialog from "./ImageMenuFilterDialog";
import ImageMenuSortDialog from "./ImageMenuSortDialog";
import ImageMenuThumbnailDialog from './ImageMenuThumbnailDialog';

export default function ImageMenu(props) {
    const {classes, toggleImageMenu, open, images, openDialog, selectImageById, sortImages, setImageVisibleById, filterImages, createOverlay, addOverlayToMap, removeOverlayOffMap, zoomToImage, FileManipulationButton} = props;
    const [filterDialogOpen, setFilterDialogOpen] = React.useState(false);
    const [sortDialogOpen, setSortDialogOpen] = React.useState(false);
    const [thumbnailDialogOpen, setThumbnailDialogOpen] = React.useState(false);

    const toggleFilterDialogOpen = (open) => {
        setFilterDialogOpen(open);
    };

    const toggleSortDialogOpen = (open) => {
        setSortDialogOpen(open);
    };

    const toggleThumbnailDialogOpen = (open) => {
        setThumbnailDialogOpen(open);
    };

    const columns = [
        {
            id: 'base_name',
            label: 'Name'
        },
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
                    images={images} 
                    openDialog={openDialog} 
                    toggleFilterDialogOpen={toggleFilterDialogOpen}
                    toggleSortDialogOpen={toggleSortDialogOpen}
<<<<<<< HEAD
                    toggleThumbnailDialogOpen={toggleThumbnailDialogOpen}
=======
                    createOverlay={createOverlay}
                    addOverlayToMap={addOverlayToMap}
                    removeOverlayOffMap={removeOverlayOffMap}
                    FileManipulationButton={FileManipulationButton}
>>>>>>> 72aa38df1462d1f3140f8a6215915b795f91cff0
                />
                <ImageTable
                    images={images}
                    columns={columns}
                    selectImageById={selectImageById}
                    setImageVisibleById={setImageVisibleById}
                    toggleThumbnailDialogOpen={toggleThumbnailDialogOpen}
                    openDialog={openDialog}
                    sortImages={sortImages}
                    zoomToImage={zoomToImage}
                />
<<<<<<< HEAD
                <ImageMenuThumbnailDialog
                    open={thumbnailDialogOpen}
                    toggleThumbnailDialogOpen={toggleThumbnailDialogOpen}
                    images={images}
                />
                <ImageMenuFilterDialog 
                    images={images} 
=======
                <ImageMenuFilterDialog
                    images={images}
>>>>>>> 72aa38df1462d1f3140f8a6215915b795f91cff0
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

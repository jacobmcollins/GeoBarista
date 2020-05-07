import React from 'react'
import { Drawer, Toolbar, IconButton } from '@material-ui/core';
import { Cancel as CancelIcon } from '@material-ui/icons';
import ImageTable from "./ImageTable";
import ImageMenuToolbar from "./ImageMenuToolbar";
import ImageMenuFilterDialog from "./ImageMenuFilterDialog";
import ImageMenuThumbnailDialog from './ImageMenuThumbnailDialog';

export default function ImageMenu(props) {
    const { classes, toggleImageMenu, open, images, openDialog, selectImageById, sortImages, setImageVisibleById, filterImages, createOverlay, addOverlayToMap, removeOverlayOffMap, zoomToImage, FileManipulationButton, updateImages } = props;
    const [filterDialogOpen, setFilterDialogOpen] = React.useState(false);
    const [thumbnailDialogOpen, setThumbnailDialogOpen] = React.useState(false);
    const [thumbnailPathState, setThumbnailPathState] = React.useState("");

    const toggleFilterDialogOpen = (open) => {
        setFilterDialogOpen(open);
    };

    const toggleThumbnailDialogOpen = (open) => {
        setThumbnailDialogOpen(open);
    };

    const updateThumbnail = (thumbPath) => {
        setThumbnailPathState(thumbPath);
    }

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
                    createOverlay={createOverlay}
                    addOverlayToMap={addOverlayToMap}
                    removeOverlayOffMap={removeOverlayOffMap}
                    FileManipulationButton={FileManipulationButton}
                    updateImages={updateImages}

                />
                <ImageTable
                    images={images}
                    columns={columns}
                    selectImageById={selectImageById}
                    setImageVisibleById={setImageVisibleById}
                    toggleThumbnailDialogOpen={toggleThumbnailDialogOpen}
                    thumbPath={thumbnailPathState}
                    updateThumbnail={updateThumbnail}
                    openDialog={openDialog}
                    sortImages={sortImages}
                    zoomToImage={zoomToImage}
                />
                <ImageMenuThumbnailDialog
                    open={thumbnailDialogOpen}
                    toggleThumbnailDialogOpen={toggleThumbnailDialogOpen}
                    thumbPath={thumbnailPathState}
                />
                <ImageMenuFilterDialog
                    images={images}
                    columns={columns}
                    filterImages={filterImages}
                    open={filterDialogOpen}
                    toggleFilterDialogOpen={toggleFilterDialogOpen}
                />
            </div>
        </Drawer>
    )
}

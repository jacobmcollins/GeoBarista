import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import ImageTableRow from './ImageTableRow';

export default function ImageTableBody(props) {
    const {columns, images, updateThumbnail, selectImageById, setImageVisibleById, zoomToImage, toggleThumbnailDialogOpen} = props;
    return (
        <TableBody>
            {images.map((image) => (
                <ImageTableRow 
                    columns={columns} 
                    image={image} 
                    selectImageById={selectImageById}
                    setImageVisibleById={setImageVisibleById}
                    toggleThumbnailDialogOpen={toggleThumbnailDialogOpen}
                    updateThumbnail={updateThumbnail}
                    zoomToImage={zoomToImage}
                />
            ))}
        </TableBody>
    )
}
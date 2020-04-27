import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import ImageTableRow from './ImageTableRow';

export default function ImageTableBody(props) {
<<<<<<< HEAD
    const {columns, images, selectImageById, setImageVisibleById, toggleThumbnailDialogOpen} = props;
=======
    const {columns, images, selectImageById, setImageVisibleById, zoomToImage} = props;
>>>>>>> 72aa38df1462d1f3140f8a6215915b795f91cff0
    return (
        <TableBody>
            {images.map((image) => (
                <ImageTableRow 
                    columns={columns} 
                    image={image} 
                    selectImageById={selectImageById}
                    setImageVisibleById={setImageVisibleById}
<<<<<<< HEAD
                    toggleThumbnailDialogOpen={toggleThumbnailDialogOpen}
=======
                    zoomToImage={zoomToImage}
>>>>>>> 72aa38df1462d1f3140f8a6215915b795f91cff0
                />
            ))}
        </TableBody>
    )
}
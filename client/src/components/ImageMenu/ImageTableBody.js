import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import ImageTableRow from './ImageTableRow';

export default function ImageTableBody(props) {
    const {images, selectImageById} = props;
    return (
        <TableBody>
            {images.map((image) => (
                <ImageTableRow image={image} selectImageById={selectImageById}/>
            ))}
        </TableBody>
    )
}
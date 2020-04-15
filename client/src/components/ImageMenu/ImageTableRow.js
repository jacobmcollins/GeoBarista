import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

export default function ImageTableRow(props) {
    const {image, selectImageById} = props;
    return (
        <TableRow key={image._id} style={{height: 33}}>
            <TableCell padding="checkbox">
                    <Checkbox
                        checked={image.selected}
                        onChange={((e) => {
                            selectImageById(image._id, e.target.checked);
                        })}
                    />
            </TableCell>
            <TableCell component="th" scope="row">
                {image.file_path}
            </TableCell>
            <TableCell component="th" scope="row">
                {image.mission}
            </TableCell>
        </TableRow>
    )
}
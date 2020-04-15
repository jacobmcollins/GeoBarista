import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from "@material-ui/core/Tooltip";

export default function ImageTableRow(props) {
    const {columns, image, selectImageById} = props;
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
            { 
                columns.map((column) => {
                    return (
                        <Tooltip title={image.file_path}>
                            <TableCell component="th" scope="row">
                                {image[column.id]}
                            </TableCell>
                        </Tooltip>
                    )
                })
            }
        </TableRow>
    )
}
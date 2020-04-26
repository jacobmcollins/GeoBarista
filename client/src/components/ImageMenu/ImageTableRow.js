import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Tooltip from "@material-ui/core/Tooltip";

export default function ImageTableRow(props) {
    const {columns, image, selectImageById, setImageVisibleById, toggleThumbnailDialogOpen} = props;
    return (
        <TableRow key={image._id} style={{height: 33}} onDoubleClick={() => { toggleThumbnailDialogOpen(true) }} >
            <TableCell padding="checkbox" >
                    <Checkbox
                        checked={image.selected}
                        onChange={((e) => {
                            selectImageById(image._id, e.target.checked);
                            console.log("selected: " + image.selected)
                        })}
                    />
            </TableCell>
            <TableCell padding="checkbox">
                    <Checkbox
                        color = {'default'}
                        checkedIcon = {<VisibilityIcon/>}
                        icon = {<VisibilityOffIcon color = {'secondary'}/>}
                        checked={image.visible}
                        onChange={((e) => {
                            setImageVisibleById(image._id, e.target.checked);
                            console.log("visible: " + image.visible)
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
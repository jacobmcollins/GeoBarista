import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ZoomInIcon from '@material-ui/icons/ZoomIn';

export default function ImageTableRow(props) {
<<<<<<< HEAD
    const { columns, image, selectImageById, setImageVisibleById, toggleThumbnailDialogOpen } = props;
=======
    const {columns, image, selectImageById, setImageVisibleById, zoomToImage} = props;
>>>>>>> 72aa38df1462d1f3140f8a6215915b795f91cff0
    return (
        <TableRow key={image._id} style={{ height: 33 }} onDoubleClick={(event) => { toggleThumbnailDialogOpen(true, event); console.log("event target ", event.target.title) }} >
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
                    color={'default'}
                    checkedIcon={<VisibilityIcon />}
                    icon={<VisibilityOffIcon color={'secondary'} />}
                    checked={image.visible}
                    onChange={((e) => {
                        setImageVisibleById(image._id, e.target.checked);
                        console.log("visible: " + image.visible)
                    })}
                />
            </TableCell>
<<<<<<< HEAD
            {
=======
            <TableCell padding="checkbox">
                <Tooltip title={"Zoom to image"}>
                    <IconButton 
                        onClick={() => zoomToImage(image)}
                    >
                        <ZoomInIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
            { 
>>>>>>> 72aa38df1462d1f3140f8a6215915b795f91cff0
                columns.map((column) => {
                    return (
                        <Tooltip title={image.file_path}>
                            <TableCell component="th" scope="row" >
                                {image[column.id]}
                            </TableCell>
                        </Tooltip>
                    )
                })
            }
        </TableRow>
    )
}
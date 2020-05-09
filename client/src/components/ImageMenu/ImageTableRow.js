import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import Client from '../../Client';

export default function ImageTableRow(props) {
    const { columns, image, updateThumbnail, selectImageById, setImageVisibleById, zoomToImage,  
    handleContextClick, updateImage } = props;
    return (
        <TableRow key={image._id} style={{ height: 33 }} >
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
                columns.map((column) => {
                    return (
                        <TableCell component="th" scope="row" onContextMenu={async (event) => {
                            updateThumbnail(image.thumbnail_path); 
                            handleContextClick(event); 
                            await updateImage(image);}}>
                            {image[column.id]}
                        </TableCell>
                    )
                })
            }
        </TableRow>
    )
}
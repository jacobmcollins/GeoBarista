import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export default function ImageTableHead(props) {
    const {columns, images, selectImageById, setImageVisibleById, openDialog} = props;
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        onChange={((e) => {
                            images.forEach((image) => {
                                selectImageById(image._id, e.target.checked);
                            })
                        })}
                    />
                </TableCell>
                <TableCell padding="checkbox">
                    <Checkbox
                        color = {'default'}
                        defaultChecked = {true}
                        checkedIcon = {<VisibilityIcon/>}
                        icon = {<VisibilityOffIcon color = {'secondary'}/>}
                        onChange={((e) => {
                            images.forEach((image) => {
                                setImageVisibleById(image._id, e.target.checked)
                            })
                        })}
                    />
                </TableCell>
                {
                    columns.map((column) => {
                        return (
                            <TableCell>
                                {column.label}
                            </TableCell>
                        )
                    })
                }
            </TableRow>
        </TableHead>
    )
}
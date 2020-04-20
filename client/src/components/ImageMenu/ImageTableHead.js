import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { ContactSupportOutlined } from '@material-ui/icons';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


export default function ImageTableHead(props) {
    const {columns, images, selectImageById, setImageVisibleById, openDialog, sortImages} = props;
    const [sortFields, setSortFields] = React.useState({
        sortBy : 'base_name',
        sortDirection : -1
    });
    const handleClick = async (column) => {
        if(sortFields.sortBy == column) {
            setSortFields({
                sortBy: column,
                sortDirection: ((sortFields.sortDirection === 1) ? -1 : 1)
            })
        }
        else {
            setSortFields({
                sortBy: column,
                sortDirection: -1
            })
        }
        await sortImages(sortFields.sortBy, sortFields.sortDirection);
    }
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
                            <TableCell onClick={() => { handleClick(column.id) }}>
                            <div style={{display: 'flex',alignItems: 'center'}} >
                                <span>{column.label} </span>
                                {sortFields.sortBy === column.id
                                    ? (sortFields.sortDirection === 1 ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>)
                                    : <ImportExportIcon />}
                            </div>

                            </TableCell>
                        )
                    })
                }
            </TableRow>
        </TableHead>
    )
}
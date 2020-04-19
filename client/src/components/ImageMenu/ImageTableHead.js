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
    const {columns, images, selectImageById, setImageVisibleById, openDialog} = props;
    const [sortState, setSortState] = React.useState({
        sortBy : 'File Name',
        sortDirection : 'asc'
    });
    const columnToSort = (e,column) => {
        console.log("clicky clack: " + column.label);
        if (sortState.sortBy === column.label) {
            setSortState({
                ...sortState,
                sortBy: column.label,
                sortDirection : 'desc'
            })
        }
        else {
            setSortState({
                ...sortState,
                sortBy: column.label,
                sortDirection : 'asc'
            })
        }
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
                            <TableCell onClick={(e) => columnToSort(e,column)}>
                            <div style={{display: 'flex',alignItems: 'center'}} >
                                <span>{column.label} </span>
                        {sortState.sortBy === column.label 
                            ? (sortState.sortDirection === 'asc' ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>)
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
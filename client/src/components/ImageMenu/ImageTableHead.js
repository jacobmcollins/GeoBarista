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
    const [sortState, setSortState] = React.useState({
        sortBy : 'base_name',
        sortDirection : 'ascending'
    });
    const columnToSort = (e,column) => {
        console.log("clicky clack: " + column.id);
        if (sortState.sortBy === column.id && sortState.sortDirection === "ascending") {
            setSortState({
                ...sortState,
                sortBy: column.id,
                sortDirection : 'descending'
            })
        }
        else {
            setSortState({
                ...sortState,
                sortBy: column.id,
                sortDirection : 'ascending'
            })
        }

        props.sortImages( sortState.sortBy, sortState.sortDirection);
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
                        {sortState.sortBy === column.id
                            ? (sortState.sortDirection === 'ascending' ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>)
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
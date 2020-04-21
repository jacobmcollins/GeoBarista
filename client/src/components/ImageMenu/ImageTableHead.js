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
import { IconButton } from '@material-ui/core';


export default function ImageTableHead(props) {
    const {columns, images, selectImageById, setImageVisibleById, openDialog, sortImages} = props;
    const [sortFields, setSortFields] = React.useState({
        sortBy : 'mission',
        sortDirection : 1,
    });
    //secondary DB sort fields
    // *selected note a value of 1 sorts to bottom of list -1 to top of list
    // this is because selected is a bool so false would end up on top of list
    const [sortFieldsSecondary, setSortFieldsSecondary] = React.useState({
        sortBy : 'selected',
        sortDirection : 0
    })
    //gets the secondary sort information
    // this currently is set to only work with selected
    const selectedOnClick = async () => {
        let selectSort = sortFieldsSecondary.sortDirection === 0
            ? selectSort = 1 
            : (sortFieldsSecondary.sortDirection === 1 
                ? selectSort = -1
                : selectSort = -0 );
        setSortFieldsSecondary({
            ...sortFieldsSecondary,
            sortDirection : selectSort
        })
        selectSort === 0 ?
            await sortImages(sortFields.sortBy, sortFields.sortDirection)
            : await sortImages(sortFields.sortBy, sortFields.sortDirection, sortFieldsSecondary.sortBy, selectSort);
    }
    // gets the primary sort information gained by clicking on the column header
    const handleClick = async (column) => {
        let sendDirections = (sortFields.sortDirection === 1) ? -1 : 1;
        if(sortFields.sortBy == column) {
            setSortFields({
                sortBy: column,
                sortDirection: sendDirections

            })
        }
        else {
            setSortFields({
                sortBy: column,
                sortDirection: 1
            })
        }
        sortFieldsSecondary.sortDirection === 0 ?
         await sortImages(column, sendDirections)
         : await sortImages(column, sendDirections, sortFieldsSecondary.sortBy, sortFieldsSecondary.sortDirection);
    }
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <div style={{display: 'flex',alignItems: 'center'}} >
                        <Checkbox
                            onChange={((e) => {
                                images.forEach((image) => {
                                    selectImageById(image._id, e.target.checked);
                                })
                            })}
                        />
                        <IconButton onClick={() => selectedOnClick() } >
                            {sortFieldsSecondary.sortDirection === 0 
                                ? <ImportExportIcon /> 
                                : (sortFieldsSecondary.sortDirection === 1 
                                    ? <ArrowDownwardIcon/> 
                                    : <ArrowUpwardIcon/> ) }
                        </IconButton>
                    </div>
                </TableCell >
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
                                    ? (sortFields.sortDirection === 1 
                                        ? <ArrowUpwardIcon/> 
                                        : <ArrowDownwardIcon/>)
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
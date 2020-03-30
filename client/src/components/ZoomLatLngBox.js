import React from 'react';
import {Card} from '@material-ui/core';
import {Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core';

export default function ZoomLatLngBox(props) {
    const classes = props.classes;
    const zoom = props.zoom;
    const latlng = props.latlng;
    return (
        <Card className={classes.zoomlatlongbox} >
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Zoom</TableCell>
                        <TableCell align="center">Latitude</TableCell>
                        <TableCell align="center">Longitude</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center">{zoom}</TableCell>
                        <TableCell align="center">{latlng.lat.toFixed(2)}</TableCell>
                        <TableCell align="center">{(latlng.lng % 180).toFixed(2)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    )
}



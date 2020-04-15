import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ImageTable(props) {
    const {images, selectImageById} = props;
    const classes = useStyles();

    return (
    <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
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
            <TableCell>File Path</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {images.map((image) => (
            <TableRow key={image._id} style={{height: 33}}>
                <TableCell padding="checkbox">
                        <Checkbox
                          checked={image.selected}
                          onChange={((e) => {
                              selectImageById(image._id, e.target.checked);
                          })}
                        />
                </TableCell>
                <TableCell component="th" scope="row">
                {image.file_path}
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>
    );
}
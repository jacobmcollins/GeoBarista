import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import ImageTableBody from './ImageTableBody';
import ImageTableHead from './ImageTableHead';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ImageTable(props) {
    const {images, columns, updateThumbnail, selectImageById, setImageVisibleById, openDialog, sortImages, toggleThumbnailDialogOpen, zoomToImage} = props;
    const classes = useStyles();
   
    return (
    <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" >
            <ImageTableHead 
                columns={columns}
                images={images} 
                selectImageById={selectImageById} 
                setImageVisibleById={setImageVisibleById}
                openDialog={openDialog}
                sortImages={sortImages}
            />
            <ImageTableBody 
                columns={columns}
                images={images} 
                selectImageById={selectImageById} 
                setImageVisibleById={setImageVisibleById}
                toggleThumbnailDialogOpen={toggleThumbnailDialogOpen}
                updateThumbnail={updateThumbnail}
                zoomToImage={zoomToImage}
            />
        </Table>
    </TableContainer>
    );
}
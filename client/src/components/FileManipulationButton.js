
import React from 'react';
import { Grid, Button } from '@material-ui/core';
import FileManipulationMenu from './FileManipulationMenu';
import FileCopyIcon from '@material-ui/icons/FileCopy';

// handles opening and closing of dialog menu
// passes input files to dialog menu

export default function FileManipulationButton(props) {
  const classes = props.classes;
  const [open, setOpen] = React.useState(false);
  const inputFiles = props.inputFiles;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Grid container>
      <Grid item>
        <div classes={classes.FileManipButton}>
          <Button variant="contained" size="large" color="Primary" onClick={handleClickOpen}>
            <FileCopyIcon />
          </Button>
          <FileManipulationMenu inputFiles={inputFiles} open={open} onClose={handleClose} />
        </div>
      </Grid>
    </Grid>
  )
}

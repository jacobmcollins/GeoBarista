
import React from 'react';
import { Grid, Button } from '@material-ui/core';
import FileManipulationMenu from './FileManipulationMenu';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from "@material-ui/core/Tooltip";

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
    <React.Fragment>
      <Tooltip title={"File Manipulation"}>
        <Button size="large" onClick={handleClickOpen}>
          <FileCopyIcon />
        </Button>
      </Tooltip >
      <FileManipulationMenu inputFiles={inputFiles} open={open} onClose={handleClose} />
    </React.Fragment >
  )
}

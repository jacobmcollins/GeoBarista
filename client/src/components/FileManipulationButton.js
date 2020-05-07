
import React from 'react';
import { Grid, Button } from '@material-ui/core';
import FileManipulationMenu from './FileManipulationMenu';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from "@material-ui/core/Tooltip";
import Client from '../Client';

// handles opening and closing of dialog menu
// passes input files to dialog menu

export default function FileManipulationButton(props) {
  const classes = props.classes;
  const [open, setOpen] = React.useState(false);
  const inputFiles = props.inputFiles;
  const updateImages = props.updateImages;

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
      <FileManipulationMenu
        open={open}
        onClose={handleClose}
        updateImages={updateImages}
      />
    </React.Fragment >
  )
}

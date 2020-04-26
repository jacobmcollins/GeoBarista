import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import VisibilityIcon from '@material-ui/icons/Visibility';
import FilterListIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';
import FileManipulationButton from './../FileManipulationButton';
import { tooltip } from "leaflet";

const defaultToolbarStyles = {
  iconButton: {
  },
};

class ImageMenuToolbar extends React.Component {

  render() {
    const { classes, openDialog, toggleFilterDialogOpen, toggleSortDialogOpen, FileManipulationButton } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"Add Image"}>
          <IconButton className={classes.iconButton} onClick={openDialog}>
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Remove Selected Image"}>
          <IconButton className={classes.iconButton}>
            <DeleteIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"View Selected Image Overlays"}>
          <IconButton className={classes.iconButton}>
            <VisibilityIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Filter Images"}>
          <IconButton className={classes.iconButton} onClick={() => { toggleFilterDialogOpen(true) }}>
            <FilterListIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Sort Images"}>
          <IconButton className={classes.iconButton} onClick={() => { toggleSortDialogOpen(true) }}>
            <SortIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
        <FileManipulationButton />
      </React.Fragment>
    );
  }

}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(ImageMenuToolbar);
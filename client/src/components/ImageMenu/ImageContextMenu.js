import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


  
export default function ImageContextMenu(props) {
  const{ handleContextClose, state, toggleThumbnailDialogOpen } = props;
  return (
    <div style={{ cursor: 'context-menu' }}>
      <Menu
        keepMounted
        open={state.mouseY !== null}
        onClose={handleContextClose}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null
            ? { top: state.mouseY, left: state.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={() => {toggleThumbnailDialogOpen(true); handleContextClose();}}>Display Thumbnail</MenuItem>
        <MenuItem onClick={() => {handleContextClose()}}>Display Metadata</MenuItem>
      </Menu>
    </div>
  );
}
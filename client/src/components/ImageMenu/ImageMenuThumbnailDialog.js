import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

export default function ImageMenuThumbnailDialog(props) {
  const { open, toggleThumbnailDialogOpen, thumbPath } = props;
  return (
    <Dialog
      open={open}
      onClose={() => { toggleThumbnailDialogOpen(false) }}
    >
      <DialogContent>
        {thumbPath}
        <img src={thumbPath}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { toggleThumbnailDialogOpen(false) }} color="primary" autoFocus>
          Close
                </Button>
      </DialogActions>
    </Dialog>
  );
}

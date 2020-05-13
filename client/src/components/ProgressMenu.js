import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function ProgressMenu(props) {
  return (
    <div>
      <Dialog
        open={props.open}
      >
        <DialogTitle >{props.msg}</DialogTitle>
        <DialogContent>
            <LinearProgress />
        </DialogContent>
      </Dialog>
    </div>
  );
}

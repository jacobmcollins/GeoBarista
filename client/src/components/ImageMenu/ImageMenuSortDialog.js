import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ImageMenuSortDialog(props) {
    const {open, toggleSortDialogOpen} = props;
    return (
            <Dialog
            open={open}
            onClose={() => { toggleSortDialogOpen(false) }}
            >
            <DialogTitle>{"Sort Images"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Delete this content text in favor of sort menu
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { toggleSortDialogOpen(false)}} color="primary" autoFocus>
                Submit
                </Button>
            </DialogActions>
            </Dialog>
    );
}

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300
  }
}));



export default function ImageMenuThumbnailDialog(props, event) {
  const classes = useStyles();
  const { open, image, toggleThumbnailDialogOpen } = props;
  return (
    <Dialog fullWidth={true} maxWidth={'xs'}
      open={open}
      onClose={() => { toggleThumbnailDialogOpen(false) }}
    >
      <DialogContent>
        testing
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
          //image={require(image.thumbnail_path)}
          >
          </CardMedia>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { toggleThumbnailDialogOpen(false) }} color="primary" autoFocus>
          Close
                </Button>
      </DialogActions>
    </Dialog>
  );
}

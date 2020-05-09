import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogContentText } from '@material-ui/core';
import Client from '../../Client';

export default function ImageMenuMetaDataDialog(props) {
  const { open, toggleMetaDataDialogOpen, image } = props;


  var imageInfo = (
    <DialogContentText>
      No base meta data.
    </DialogContentText>)
  if(image !== undefined)
  {
    imageInfo = (
      <DialogContentText>
        Mission: {image.mission}
        Camera: {image.camera}
        Time: {image.time}
        ImageID: {image.imgid}
        FOV: {image.fov}
        LLA: {image.lla}
        Velocity {image.velocity}
        GSD: {image.gsd}
      </DialogContentText>
    )
  }

  var ppjInfo = (
    <DialogContentText>
      No PPJ data.
    </DialogContentText>
  )
  if(image !== undefined)
  {
    //image.ppjJsonData = Client.get_meta_data(image.ppj_data)
    //var ppjData = JSON.parse(image.ppjJsonData)

    ppjInfo = (
      <DialogContentText>
        Sensor Width: ppjData.sensorWidth
      </DialogContentText>
    )
  }
  return (
    <Dialog
      open={open}
      onClose={() => { toggleMetaDataDialogOpen(false) }}
    >
      <DialogContent>
        TEST: {imageInfo}
        
        
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { toggleMetaDataDialogOpen(false) }} color="primary" autoFocus>
          Close
                </Button>
      </DialogActions>
    </Dialog>
  );
}

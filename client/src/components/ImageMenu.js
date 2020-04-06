import React from 'react'
import {Drawer, Toolbar, IconButton} from '@material-ui/core';
import {Cancel as CancelIcon} from '@material-ui/icons';
import MUIDataTable from "mui-datatables";
import CustomToolbar from "./CustomToolbar";

export default function ImageMenu(props) {
    const {classes, toggleImageMenu, open, images, openDialog} = props;

    const columns = [
        {name: "file",label: "File"},
        {name: "mission",label: "Mission"},
        {name: "fov",label: "FOV"},
        {name: "lla",label: "LLA"},
        {name: "velocity",label: "Velocity"},
        {name: "time",label: "Time"},
        {name: "gsd",label: "GSD"},
        {name: "camera",label: "Camera"},
    ]
    
    const options = {
      filterType: 'checkbox',
      setTableProps: () => {
        return {
          size: "small"
        };
      },
      search: false,
      print: false,
      download: false,
      viewColumns: false,
      customToolbar: () => {
        return (
          <CustomToolbar openDialog={openDialog}/>
        );
      }
    };

    return (
        <Drawer variant="persistent" anchor="right" open={open} onClose={toggleImageMenu(false)}>
            <div className={classes.imageMenu} role="presentation">
                <Toolbar className={classes.toolbar}>
                    <IconButton size="small" onClick={toggleImageMenu(false)}>
                        <CancelIcon />
                    </IconButton >
                </Toolbar>
                <MUIDataTable 
                    title={"Image List"}
                    data={images}
                    columns={columns}
                    options={options}
                />
            </div>
        </Drawer>
    )
}

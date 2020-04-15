import React from 'react'
import {Drawer, Toolbar, IconButton} from '@material-ui/core';
import {Cancel as CancelIcon} from '@material-ui/icons';
import MUIDataTable from "mui-datatables";
import CustomToolbar from "./CustomToolbar";

export default function ImageMenu(props) {
    const {classes, toggleImageMenu, open, images, openDialog, selectImageById} = props;

    const columns = [
        {name: "file_path",label: "File"},
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
      },
      serverSide: true,
      onRowsSelect: (all, curr) => {
        console.log('onRowsSelect', all, curr);
      },
      onTableChange: (action, tableState) => {
        console.log('onTableChange', action, tableState);
        switch(action) {
          case 'rowsSelect':
            tableState.selectedRows.data.forEach((elem) => {
              selectImageById(images[elem.index]._id, !images[elem.index].selected);
            });
            break;
          case 'sort':
            // handle sort server side
            break;
          case 'rowsSelect':
            // handle how row select works
            // TODO: fix checkbox unclicking when 'propsUpdate'
            break;
          case 'filterChange':
            // handle a filter server side
            break;
          case 'propsUpdate':
            // TODO: see rowsSelect TODO
            break;
          default:
            break;
        }
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

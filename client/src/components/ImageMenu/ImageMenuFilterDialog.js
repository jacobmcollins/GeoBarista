import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import MenuItem from "@material-ui/core/MenuItem";

export default function ImageMenuFilterDialog(props) {
    const {images,open, toggleFilterDialogOpen} = props;

    //var storing distinct value from file types, missions, ... to show in the dopdown in dialog
    const file_types = [...new Set(images.map(item => item.file_extension))];
    const missions = [...new Set(images.map(item => item.mission))];
    const cameras = [...new Set(images.map(item => item.camera))];
    const FOVs = [...new Set(images.map(item => item.fov))];
    const LLAs = [...new Set(images.map(item => item.lla))];
    const velocities = [...new Set(images.map(item => item.velocity))];
    const GSDs = [...new Set(images.map(item => item.gsd))];

    //var storing all input and selection user choose from the dialog
    var name_input                  
    var type_select
    var mission_select
    var camera_select
    var fov_select
    var lla_select
    var velocity_select
    var gsd_select
 
    return (
            <Dialog
            open={open}
            onClose={() => { toggleFilterDialogOpen(false) }}
            fullWidth={"true"}
            >
            <DialogTitle>{"Filter Images"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <div>
                        <TextField 
                            id="file_name" 
                            label="File Name" 
                            fullWidth={"true"}
                            onChange={e => name_input = e.target.value}
                        />
                    </div>
                    <div>
                        <TextField
                            id="file_type"
                            fullWidth={"true"}
                            select
                            label="Select"
                            helperText="Filter by File Type"
                            onChange={e => type_select = e.target.value}
                        >
                            {file_types.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div>
                        <TextField
                            id="mission"
                            fullWidth={"true"}
                            select
                            label="Select"
                            helperText="Filter by Mission"
                            onChange={e => mission_select = e.target.value}
                        >
                            {missions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div>
                        <TextField
                            id="camera"
                            fullWidth={"true"}
                            select
                            label="Select"
                            helperText="Filter by Camera"
                            onChange={e => camera_select = e.target.value}
                        >
                            {cameras.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div>
                        <TextField
                            id="fov"
                            fullWidth={"true"}
                            select
                            label="Select"
                            helperText="Filter by FOV"
                            onChange={e => fov_select = e.target.value}
                        >
                            {FOVs.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div>
                        <TextField
                            id="lla"
                            fullWidth={"true"}
                            select
                            label="Select"
                            helperText="Filter by LLA"
                            onChange={e => lla_select = e.target.value}
                        >
                            {LLAs.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div>
                        <TextField
                            id="velocity"
                            fullWidth={"true"}
                            select
                            label="Select"
                            helperText="Filter by Velocity"
                            onChange={e => velocity_select = e.target.value}
                        >
                            {velocities.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div>
                        <TextField
                            id="gsd"
                            fullWidth={"true"}
                            select
                            label="Select"
                            helperText="Filter by GSD"
                            onChange={e => gsd_select = e.target.value}
                        >
                            {GSDs.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { 
                    //use vars below to pass as args to backend for retrievomg filter data from DB
                    console.log(name_input 
                        + "\t" + type_select
                        + "\t" + mission_select
                        + "\t" + camera_select
                        + "\t" + fov_select
                        + "\t" + lla_select
                        + "\t" + velocity_select
                        + "\t" + gsd_select)
                
                        

                    toggleFilterDialogOpen(false)
                }} color="primary" autoFocus>
                Submit
                </Button>
            </DialogActions>
            </Dialog>
    );
}

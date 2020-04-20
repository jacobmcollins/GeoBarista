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
    const {images,columns,filterImages,open, toggleFilterDialogOpen} = props;

    //var storing distinct value from file types, missions, ... to show in the dopdown in dialog
    const distinct_columns_data = []
    for(const column of columns){
        distinct_columns_data[column.id] = [...new Set(images.map(item => item[column.id]))];
    }

    //var storing input and selection user choose from the filter dialog
    const user_filter_fields = []
 
    return (
            <Dialog
            open={open}
            onClose={() => { toggleFilterDialogOpen(false) }}
            fullWidth={"true"}
            >
            <DialogTitle>{"Filter Images"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {columns.map(column => {
                        return (
                            <div>
                            <TextField
                                id={column.id}
                                fullWidth={"true"}
                                select
                                label="Select"
                                helperText={"Filter by " + column.label}
                                onChange={e => user_filter_fields[column.id] = e.target.value}
                             >
                                {distinct_columns_data[column.id].map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            </div>
                        )
                    })}

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { 
                    //use user_filter_fields var to pass as arg to backend for retrieving filter data from DB
                    console.log("Filter by:\n" + user_filter_fields)
                    toggleFilterDialogOpen(false)
                }} color="primary" autoFocus>
                Submit
                </Button>
            </DialogActions>
            </Dialog>
    );
}





import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import MenuItem from "@material-ui/core/MenuItem";

import Client from '../../Client';

export default function ImageMenuFilterDialog(props) {
    const {images,columns,filterImages,open, toggleFilterDialogOpen} = props;
    //var storing input and selection user choose from the filter dialog
    const [filterParams, setFilterParams] = React.useState({})
    //var storing distinct value from file types, missions, ... to show in the dopdown in dialog
    const [uniqueColumnData, setUniqueColumnData] = React.useState({});

    React.useEffect(() => {
        for(const column of columns){
            uniqueColumnData[column.id] = [...new Set(images.map(item => item[column.id]))]
            setUniqueColumnData(uniqueColumnData)
        }
    }, [images]);

    const render_items = (id) => {
        if(id in uniqueColumnData) {
            return uniqueColumnData[id].map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
            ));
        }
    }
 
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
                                onChange={e => {
                                    console.log('filter params', filterParams);
                                    filterParams[column.id] = e.target.value;
                                    setFilterParams(filterParams);
                                }}
                             >
                                {
                                    render_items(column.id)
                                }
                            </TextField>
                            </div>
                        )
                    })}

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { 
                    toggleFilterDialogOpen(false)
                    setFilterParams({});
                    filterImages(images,filterParams);
                }} color="secondary" autoFocus>
                Reset Filter
                </Button>
                <Button onClick={() => { 
                    toggleFilterDialogOpen(false)
                    filterImages(images,filterParams);
                    setFilterParams({});
                }} color="primary" autoFocus>
                Submit
                </Button>
            </DialogActions>
            </Dialog>
    );
}




